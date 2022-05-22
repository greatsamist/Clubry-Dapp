import Head from "next/head";
import HeroCta from "../components/HeroSection/HeroCta";
import HeroDetails from "../components/HeroSection/HeroDetails";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import styles from "../styles/Home.module.scss";

export default function Home() {
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Clubry</title>
        <meta name="Clubry" content="initial-scale=1" width="device-width"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HeroCta />
      <HeroDetails />
      <Footer />
    </div>
  );
}
