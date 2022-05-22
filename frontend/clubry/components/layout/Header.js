import { useContext } from 'react'
import styles from "../../styles/Header.module.scss";
import btn from "../../styles/button.module.scss";
import Link from "next/link";

import {Web3Context} from "../../contexts/Web3Context";

// import { toHex, truncateAddress } from "../Helper/Utils";

export default function Header() {
  const {wallet,
    provider,
    connect,
    connectTo,
    disconnect,} = useContext(Web3Context)
    
  return (
    <div className={styles.header}>
      <div className={styles.header__title}>
        <Link href="./">
          <p className={styles.header__logoText}>Clubry</p>
        </Link>
      </div>
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
  );
}
