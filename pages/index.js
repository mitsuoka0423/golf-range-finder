import Head from "next/head";
import styles from "../styles/Main.module.css";
import Map from "../components/molucules/Map";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.range}>
          <span className={styles.medium}>現在地から</span>
          <span className={styles.large}>129</span>
          <span className={styles.medium}>yard</span>
        </div>
      </header>

      <main className={styles.main}>
        <Map></Map>
      </main>
    </div>
  );
}
