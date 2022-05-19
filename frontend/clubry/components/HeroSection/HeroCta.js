import Image from "next/image";
import React from "react";
import btn from "../../styles/button.module.scss";
import styles from "../../styles/heroCta.module.scss";
import ellipse from "../../public/Ellipse.png";

function HeroCta() {
  return (
    <div className={styles.container}>
      <div className={styles.heroTxt}>
        <div className={styles.heroTxt__txt}>
          <h3 className={styles.heroTxt__heading}>
            Joint investment with other members of your club with other benefits{" "}
          </h3>
        </div>
        <div className={styles.heroBtn}>
          <button className={`${btn.btn} ${btn.btn__animated}`}>
            Join a club
          </button>
          <button className={`${btn.btn} ${btn.btn__animated}`}>
            Create a club
          </button>
        </div>
      </div>
      <div className={styles.heroImg}>
        <Image
          src={ellipse}
          height={350}
          width={350}
          alt="hero img"
          priority={true}
        />
      </div>
      
    </div>
  );
}

export default HeroCta;
