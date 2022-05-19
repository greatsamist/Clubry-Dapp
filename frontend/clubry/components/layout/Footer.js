import React from "react";
import styles from "../../styles/Footer.module.scss";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h4 className={styles.heading}>Clubry</h4>
        <p className={styles.copy}>Copyrights 2022</p>
      </div>
      <div className={styles.nav}>
        <p className={styles.nav__para}>Forum</p>
        <p className={styles.nav__para}>Github</p>
        <p className={styles.nav__para}>Developers</p>
        <p className={styles.nav__para}>Docs</p>
      </div>
    </div>
  );
}

export default Footer;
