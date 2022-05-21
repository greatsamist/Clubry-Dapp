import Head from "next/head";
import HeroCta from "../components/HeroSection/HeroCta";
import HeroDetails from "../components/HeroSection/HeroDetails";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import styles from "../styles/Home.module.scss";

import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { providerOptions } from "../components/connector/Connectors";

export default function Home() {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();

  /** Wallet connection */
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby", // optional
        theme: "dark",
        cacheProvider: true, // optional
        providerOptions, // required
      });
    }

    if (web3ModalRef.current.cachedProvider) {
      connectWallet();
    }
  }, [walletConnected]);

  const connectWallet = async () => {
    try {
      const provider = await web3ModalRef.current.connect();
      const library = new ethers.providers.Web3Provider(provider);
      // await window.ethereum.send("eth_requestAccounts");
      setProvider(provider);
      setLibrary(library);
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
  };

  const disconnect = async () => {
    await web3ModalRef.current.clearCachedProvider();
    setWalletConnected(false);
    // refreshState();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Clubry</title>
        <meta name="Clubry" content="Clubry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        disconnect={disconnect}
        walletConnected={walletConnected}
        connectWallet={connectWallet}
      />
      <HeroCta />
      <HeroDetails />
      <Footer />
    </div>
  );
}
