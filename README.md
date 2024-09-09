# Jiffy API & Taylor Hayduk's Gumroad Application

Hello Gumroad team! I love your work, your support of the creator community, and the way you run the company. I'd be happy to have the opportunity to contribute to pushing Gumroad forward as a software engineer with 9 years of coding experience.

Jiffy is inspired by **Iffy by Gumroad** and enhances the content moderation process by providing a more detailed breakdown for each flagged content piece. This includes an array of reasoning for why a particular item was flagged, giving users better insight into moderation decisions.

For text, it is built on top of OpenAI's powerful moderation capabilities, and for images, it utilizes OpenAI's image capabilities alongside prompt engineering and validation checks to provide consistent results. This project is inspired **Iffy by Gumroad**, showcasing its features and adding my own improvements.

**Contact Information:**

- [LinkedIn](https://www.linkedin.com/in/taylorhayduk/)
- [GitHub](https://github.com/taylorhayduk)
- Email: taylorhayduk@gmail.com
- Phone: +1-770-519-5367

## Live Deployment

This application is live at https://gumroad-jiffy.vercel.app/

## Features

- Text moderation
- Image moderation
- Batch processing of multiple content items
- Detailed moderation results for each item
- Easy integration with a single API call

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- An OpenAI API key

### Installation

1. Clone the repository:

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/taylorhayduk/gumroad-jiffy.git
   ```

2. Install dependencies:

   ```
   cd jiffy-api
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```
   npm run dev
   ```

## Usage

To use the Jiffy API, send a POST request to the `/api/moderate` endpoint with your content in the request body. Here's an example using curl:

```bash
curl https://gumroad-jiffy.vercel.app/api/moderate \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -d '{
    "content": [
      {
        "type": "text",
        "text": "Your content here"
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://example.com/image.jpg"
        }
      }
    ]
  }'
```

### Response Format

The API returns a JSON response with the following structure:

```json
{
  "isIffy": boolean,
  "reasoning": string,
  "itemResults": [
    {
      "isIffy": boolean,
      "reasoning": string,
      "details": {
        "categories": string[],
        "description": string
      }
    }
  ]
}
```

- `isIffy`: Overall flag indicating if any content item was flagged as inappropriate.
- `reasoning`: Overall reasoning for the moderation decision.
- `itemResults`: Array of individual moderation results for each content item.
