import React from "react";
import styles from "../../styles/Header.module.scss";
import btn from "../../styles/button.module.scss";
import Link from "next/link";
import Image from "next/image";
// import logo from "../public/zarelicon.png";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__title}>
        {/* <Image src={logo} alt="Zarel logo" height={20} width={40} /> */}
        <Link href="./">
          <p className={styles.header__logoText}>Clubry</p>
        </Link>
      </div>
      <div className={styles.header__connect}>
        <Link href="/">
          <button className={`${btn.btn} ${btn.btn__animated}`}>
            Connect Wallet
          </button>
        </Link>
      </div>
    </div>
  );
}
