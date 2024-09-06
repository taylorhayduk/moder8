import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Jiffy - Content moderation in 1 line of code
        </h1>

        <div className={styles.card}>
          <h2 className={styles.subtitle}>API Request</h2>
          <div className={styles.codeBlock}>
            <button className={styles.copyButton}>
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
            <pre className={styles.code}>
              {`curl https://gumroad-jiffy.vercel.app/api/moderate \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \\
  -d '{
    "content": [
      {
        "type": "text",
        "text": "Your content here"
      }
    ]
  }'`}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
