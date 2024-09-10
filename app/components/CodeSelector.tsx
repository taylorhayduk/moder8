"use client";

import { useState } from "react";
import styles from "./CodeSelector.module.css";

export default function CodeSelector() {
  const [selectedSnippet, setSelectedSnippet] = useState(0);
  const [copyMessage, setCopyMessage] = useState(
    "Copy/paste this into your Terminal to give it a shot!"
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[selectedSnippet]);
    setCopyMessage("Copied to clipboard! Now paste into your Terminal");
    setTimeout(() => {
      setCopyMessage("Copy/paste this into your Terminal to give it a shot!");
    }, 3000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>API Request</h2>
        <p className={styles.copyInstruction}>{copyMessage}</p>
      </div>
      <div className={styles.cardBody}>
        <ol className={styles.codeSelectorList}>
          {codeSnippets.map((_, index) => (
            <li
              key={index}
              className={`${styles.codeSelectorListItem} ${
                index === selectedSnippet && styles.codeSelectorListItemSelected
              }`}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSnippet(index);
                }}
              >
                {index + 1}
              </a>
            </li>
          ))}
        </ol>
        <div className={styles.codeBlock}>
          <button
            className={styles.copyButton}
            aria-label="Copy code"
            onClick={handleCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          </button>
          <pre className={styles.code}>{codeSnippets[selectedSnippet]}</pre>
        </div>
      </div>
    </div>
  );
}

const codeSnippets = [
  `curl https://gumroad-jiffy.vercel.app/api/moderate \\
-X POST \\
-H "Content-Type: application/json" \\
-d '{
  "content": [
    {
      "type": "text",>
      "text": "{\\"type\\":\\"product\\",\\"url\\":\\"goodsnooze.gumroad.com/l/vivid\\",\\"name\\":\\"Vivid - Double your MacBook Pro Brightness\\",\\"description\\":\\"Vivid doubles the brightness of your MacBook Pro across all apps, not just videos! ⚠️ Vivid only works on MacBook Pro with M1/2/3 Pro or Max chips.\\"}"
    },
    {
      "type": "image_url",
      "image_url": {
        "url": "https://public-files.gumroad.com/bbaop6t7ewslyb1q4rdwssyf0yw1"
      }
    }
  ]
}'`,
  `curl https://gumroad-jiffy.vercel.app/api/moderate \\
-X POST \\
-H "Content-Type: application/json" \\
-d '{
  "content": [
    {
      "type": "text",
      "text": "{\\"url\\":\\"pornhub.com\\",\\"content\\":\\"This is an adult website. This website contains age-restricted materials including nudity and explicit depictions of sexual activity. By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction you are accessing the website from and you consent to viewing sexually explicit content.\\"}"
    },
    {
      "type": "image_url",
      "image_url": {
        "url": "https://api.url2png.com/v6/P4DF2F8BC83648/189f62d5d9da7d7308982fc5650fa4b3/png/?thumbnail_max_width=851&url=pornhub.com&viewport=1280x2000"
      }
    }
  ]
}'`,
  `curl https://gumroad-jiffy.vercel.app/api/moderate \\
-X POST \\
-H "Content-Type: application/json" \\
-d '{
  "content": [
    {
      "type": "text",
      "text": "{\\"type\\":\\"user\\",\\"url\\":\\"x.com/shl\\",\\"name\\":\\"@shl on Twitter\\",\\"posts\\":[\\"Follow me for updates on my new website :)\\",\\"Check out my new website at x.com! 🚀\\",\\"I'\\''m excited to announce the launch of my new website at x.com! 🎉\\"]}"
    },
    {
      "type": "image_url",
      "image_url": {
        "url": "https://pbs.twimg.com/profile_images/1764285408135753728/pYT7qoCb_400x400.jpg"
      }
    }
  ]
}'`,
  `curl https://gumroad-jiffy.vercel.app/api/moderate \\
-X POST \\
-H "Content-Type: application/json" \\
-d '{
  "content": [
    {
      "type": "image_url",
      "image_url": {"url": "https://api.url2png.com/v6/P4DF2F8BC83648/189f62d5d9da7d7308982fc5650fa4b3/png/?thumbnail_max_width=851&url=pornhub.com&viewport=1280x2000"}
    },
    {
      "type": "image_url",
      "image_url": {"url": "https://pbs.twimg.com/profile_images/1764285408135753728/pYT7qoCb_400x400.jpg"}
    },
    {
      "type": "text",
      "text": "Like the shape of an l on your forehead, loser."
    },
    {
      "type": "text",
      "text": "Your mom is lovely."
    }
  ]
}'`,
];
