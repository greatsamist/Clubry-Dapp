import Image from "next/image";
import React from "react";
import btn from "../../styles/button.module.scss";
import styles from "../../styles/heroCta.module.scss";
import ellipse from "../../public/Ellipse.png";
import Link from "next/link";

function HeroCta() {
  return (
    <div className={styles.container}>
      <div className={styles.heroTxt}>
        <div className={styles.heroTxt__txt}>
          <Link href={"./"}>
            <h3 className={styles.heroTxt__heading}>
              Joint investment with other members of your club with other
              benefits
            </h3>
          </Link>
        </div>
        <div className={styles.heroBtn}>
          <Link href={"./join"}>
            <button className={`${btn.btn} ${btn.btn__animated}`}>
              Join a club
            </button>
          </Link>
          <Link href={"./create"}>
            <button
              className={`${btn.btn} ${btn.btn__animated} ${btn.btn__peach}`}
            >
              Create a club
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.heroImg}>
        <Image
          src={ellipse}
          height={400}
          width={400}
          alt="hero img"
          priority={true}
        />
      </div>
    </div>
  );
}

export default HeroCta;
