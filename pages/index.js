import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import styles from '../styles/Main.module.css';
import {getCurrentPositionPromise} from 'geolocation-promise';
import Map from '../components/molucules/Map';

/**
 * @return {*} Main Component
 */
export default function Main() {
  const [position, setPosition] = useState({
    lat: 35.6809591,
    lng: 139.7673068,
  });

  useEffect(() => {
    getCurrentPositionPromise().then((current) => {
      console.log(current);

      setPosition({
        lat: current.latitude,
        lng: current.longitude,
      });
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>golf range finder</title>
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
