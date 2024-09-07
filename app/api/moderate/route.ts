import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ContentItem {
  type: string;
  text?: string;
  image_url?: { url: string };
}

interface ModerationResult {
  isIffy: boolean;
  reasoning: string;
  details?: {
    categories: string[];
    description?: string;
  };
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    if (!Array.isArray(content)) {
      throw new Error("Invalid content format. 'content' must be an array.");
    }

    const moderationPromises: Array<Promise<ModerationResult>> = content.map(
      async (item: ContentItem) => moderateContent(item)
    );

    const moderationResults = await Promise.all(moderationPromises);

    const overallIsIffy = moderationResults.some((result) => result.isIffy);
    const overallReasoning = moderationResults
      .filter((result) => result.isIffy)
      .map((result) => result.reasoning)
      .join(" | ");

    return NextResponse.json({
      isIffy: overallIsIffy,
      reasoning: overallReasoning,
      itemResults: moderationResults,
    });
  } catch (error) {
    console.error("Moderation Error:", error);
    return NextResponse.json(
      {
        isIffy: true,
        reasoning: "An error occurred during content moderation.",
      },
      { status: 500 }
    );
  }
}

async function moderateContent(item: ContentItem): Promise<ModerationResult> {
  if (item.type === "text" && item.text) {
    return await moderateText(item.text);
  } else if (item.type === "image_url" && item.image_url?.url) {
    return await moderateImage(item.image_url.url);
  }
  return { isIffy: false, reasoning: "Unsupported content type" };
}

async function moderateText(text: string): Promise<ModerationResult> {
  const moderationResponse = await openai.moderations.create({
    input: text,
  });

  const result = { isIffy: false, reasoning: "" };

  const { flagged, categories } = moderationResponse.results[0];
  if (flagged) {
    result.isIffy = true;
    result.reasoning = `Text contains inappropriate content in categories: ${Object.keys(
      categories
    )
      // @ts-expect-error - TS doesn't know that categories is a Record<string, boolean>
      .filter((category) => categories[category])
      .join(", ")}`;
  }
  return result;
}

async function moderateImage(imageUrl: string): Promise<ModerationResult> {
  const moderationResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a content moderator.
Return a JSON string with a flagged boolean if the content should be flagged.
reasoning categories include [sexual, hate, harassment, self-harm, sexual/minors, hate/threatening, violence/graphic, self-harm/intent, self-harm/instructions, harassment/threatening, violence]
then a description of the image.

Example:
{
  "isIffy": true,
  "reasoning": "Text contains inappropriate content in categories: hate, harassment",
  "descripton": "{description of image goes here}"
}
`,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: imageUrl },
          },
        ],
      },
    ],
  });

  const parsedResponse = JSON.parse(
    moderationResponse.choices[0].message.content as string
  );

  return parsedResponse;
}
