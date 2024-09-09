"use client";

import { useState } from "react";
import styles from "./CodeSelector.module.css"; // Assume you have styles defined here

const codeSnippets = [
  `curl https://gumroad-jiffy.vercel.app/api/moderate \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "text",
    "text": "Your first content here"
  }'`,
  `curl https://gumroad-jiffy.vercel.app/api/moderate \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "text",
    "text": "Your second content here"
  }'`,
  `curl https://gumroad-jiffy.vercel.app/api/moderate \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "text",
    "text": "Your third content here"
  }'`,
];

export default function CodeSelector() {
  const [selectedSnippet, setSelectedSnippet] = useState(0);

  return (
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
        <button className={styles.copyButton} aria-label="Copy code">
          {/* SVG for the copy icon */}
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
  );
}
