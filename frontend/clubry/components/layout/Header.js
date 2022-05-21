import React from "react";
import styles from "../../styles/Header.module.scss";
import btn from "../../styles/button.module.scss";
import Link from "next/link";

// import { toHex, truncateAddress } from "../Helper/Utils";

export default function Header({ disconnect, walletConnected, connectWallet }) {
  return (
    <div className={styles.header}>
      <div className={styles.header__title}>
        <Link href="./">
          <p className={styles.header__logoText}>Clubry</p>
        </Link>
      </div>
      <div className={styles.header__connect}>
        {!walletConnected ? (
          <button
            onClick={connectWallet}
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
