import { useContext } from 'react'
import styles from "../../styles/Header.module.scss";
import btn from "../../styles/button.module.scss";
import Link from "next/link";
import { utils } from 'ethers';
import Image from "next/image";
import {Web3Context} from "../../contexts/Web3Context";
import {shortenWalletAddress} from "../Helper/Utils";
import logo from "../../public/ClubryLogo.png"
export default function Header() {
  const {wallet,
    provider,
    connect,
    connectTo,
    disconnect} = useContext(Web3Context)
 
  return (
    <div className={styles.header}>
      <div className={styles.header__title}>
        <div className={styles.header__logo}>
        <Image src={logo} alt="Clubry logo" width={68} height={50} />
       </div>
        <Link href="./">
          <p className={styles.header__logoText}>Clubry</p>
        </Link>
      </div>
     <div className={styles.account}>
     {wallet ? 
       <button  className={`${btn.btn} ${btn.btn__cursor} ${btn.btn__animated} ${btn.btn__transparent}`}>{shortenWalletAddress(wallet.address, 6)}</button>
        :("")}
      <div className={styles.header__connect}>
      
        {!wallet ? (
          <button
            onClick={connect}
            className={`${btn.btn} ${btn.btn__animated}`}
          >
            Connect Wallet
          </button>
        ) : (
         
          <button
            onClick={disconnect}
            className={`${btn.btn} ${btn.btn__animated} ${btn.btn__transparent}`}
          >
            Disconnect
          </button>
        )}
      </div>
      </div>
    </div>
  );
}
