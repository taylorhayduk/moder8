import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    let isIffy = false;
    let reasoning = "";

    for (const item of content) {
      if (item.type === "text" && item.text) {
        const moderationResponse = await openai.moderations.create({
          input: item.text,
        });

        const { flagged, categories } = moderationResponse.results[0];
        if (flagged) {
          isIffy = true;
          reasoning = `Text contains inappropriate content in categories: ${Object.keys(
            categories
          )
            // @ts-expect-error - TS doesn't know that categories is a Record<string, boolean>
            .filter((category) => categories[category])
            .join(", ")}`;
          break;
        }
      }

      // TODO: Test image moderation
      if (item.type === "image_url" && item.image_url?.url) {
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
                  image_url: {
                    url: item.image_url?.url,
                  },
                },
              ],
            },
          ],
        });

        const parsedResponse = JSON.parse(
          moderationResponse.choices[0].message.content as string
        );
        if (parsedResponse.isIffy) {
          return NextResponse.json(parsedResponse);
        }
      }
    }

    if (!isIffy) {
      reasoning =
        "The content is appropriate and does not contain explicit or inappropriate material.";
    }

    return NextResponse.json({ iffy: isIffy, reasoning });
  } catch (error) {
    console.error("Moderation Error:", error);
    return NextResponse.json(
      { iffy: true, reasoning: "An error occurred during content moderation." },
      { status: 500 }
    );
  }
}
