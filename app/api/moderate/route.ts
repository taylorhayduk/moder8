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
  categories: string[];
  reasoning?: string;
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    // Validate content items
    if (!content || !Array.isArray(content)) {
      throw new Error("Invalid content format: 'content' must be an array.");
    }
    content.forEach((item: ContentItem) => {
      if (item.type !== "text" && item.type !== "image_url") {
        throw new Error(
          `Invalid content item: "type" must be "text" or "image_url".`
        );
      }
      if (item.type === "text" && !item.text) {
        throw new Error(
          'Invalid content item: "type" is "text" but "text" field is missing.'
        );
      }
      if (item.type === "image_url" && !item.image_url?.url) {
        throw new Error(
          'Invalid content item: "type" is "image_url" but "image_url" field is missing.'
        );
      }
    });

    const moderationPromises: Array<Promise<ModerationResult>> = content.map(
      async (item: ContentItem) => moderateContent(item)
    );

    const moderationResults = await Promise.all(moderationPromises);

    const overallIsIffy = moderationResults.some((result) => result.isIffy);
    const categories = moderationResults
      .filter((result) => result.isIffy)
      .flatMap((result) => result.categories)
      .filter((category, index, self) => self.indexOf(category) === index);

    return NextResponse.json({
      isIffy: overallIsIffy,
      categories,
      content: moderationResults,
    });
  } catch (error) {
    console.error("Moderation Error:", error);
    return NextResponse.json(
      {
        error: `${error?.message || error}`,
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
  return { isIffy: true, categories: [] };
}

async function moderateText(text: string): Promise<ModerationResult> {
  const moderationResponse = await openai.moderations.create({
    input: text,
  });

  const result = { isIffy: false, categories: [] };

  const { flagged, categories } = moderationResponse.results[0];
  if (flagged) {
    result.isIffy = true;
    // @ts-expect-error - TS is silly sometimes
    result.categories = Object.keys(categories).filter(
      // @ts-expect-error - TS doesn't know that categories is a Record<string, boolean>
      (key) => categories[key] === true
    ) as string[];
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
  "categories": ["hate", "harassment"],
  "reasoning": "{description of image goes here}"
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
