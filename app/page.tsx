import styles from "./page.module.css";
import CodeSelector from "./components/CodeSelector";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Jiffy</h1>
          <p className={styles.subtitle}>Content moderation in a jiffy</p>
          <p className={styles.attribution}>
            {`Made for Gumroad with ❤️ by `}
            <a
              href="https://www.linkedin.com/in/taylorhayduk/"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Taylor Hayduk
            </a>
          </p>
          <p className={styles.attribution}>
            <a
              href="https://github.com/taylorhayduk/gumroad-jiffy"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github repo of this project
            </a>
          </p>
        </header>
        <CodeSelector />
      </div>
    </main>
  );
}
