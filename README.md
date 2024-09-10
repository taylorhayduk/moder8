# Welcome to Jiffy!

Hello, Gumroad team! I'm Taylor Hayduk, and I've had a lot of fun creating Jiffy, my take on Iffy, Gumroad's content moderation API.

I love your work, your support of the creator community, and the way you run the team. I'd be soooo happy to work with y'all!

## Table of Contents

- [About Jiffy](#about-jiffy)
- [Contact Information](#contact-information)
- [Live Deployment](#live-deployment)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Future Improvements](#future-improvements)

## About Jiffy

Jiffy was built from scratch on NextJS, uses OpenAI's moderation API for text, and prompt engineering alongside OpenAI's completions API for images. It is deployed on Vercel and uses cloud functions for the moderation route.

### Improvements to Iffy

Jiffy enhances content moderation by processing an array of text and images simultaneously. It returns all content violation categories at the root level, with content-specific categories and reasoning provided for each item in a nested array. This structure ensures that the moderation results are both specific and useful, providing granular insights into why each piece of content was flagged.

Each element in the content array is passed to OpenAI individually but simultaneously, to provide granular flagging while maintaining a fast API.

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

## Technologies Used

- NextJS
- React
- CSS Modules
- OpenAI API (Moderation API for text, Completions API for images)
- Vercel (for deployment and cloud functions)
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- An OpenAI API key

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
  "categories": string[],
  "content": [
    {
      "isIffy": boolean,
      "categories": string[],
      "reasoning": string,
    }
  ]
}
```

- `isIffy` [root]: Flag indicating if a content item was flagged as inappropriate. The `isIffy` at the root will be true if **any** content is flagged.
- `categories`: All deduplicated flagging categories across all content items.
- `content`: Array of individual moderation results for each content item.
  - `isIffy`: Flag indicating if specific content was flagged as inappropriate.
  - `categories`: Flagging categories for specific content.
  - `reasoning`: Description of why the content was flagged.

## Future Improvements

- Implement caching to improve performance and reduce API calls
- Add support for more content types (e.g., audio, video)
- Implement authentication
- Implement rate limiting and enhanced security measures
- Implement logging
- Add support for custom moderation rules
