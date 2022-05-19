import Image from "next/image";
import React from "react";
import styles from "../../styles/HeroDetails.module.scss";
import bag from "../../public/bag.png";
import money from "../../public/money.png";
import card from "../../public/card.png";

function HeroDetails() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.section__img}>
          <Image src={bag} alt="invest" height={150} width={200} />
        </div>
        <div className={`${styles.section__txt} ${styles.section__right}`}>
          <h4 className={styles.section__heading4}>
            Take investment decisions with other members of the club
          </h4>
          <p className={styles.section__para}>
            Joining a club brings a whole lot of investment possibilities and
            you as an investor is not left out from the decision making process,
            Get exposed to other investment platforms and cast votes on which
            one to invest it
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={`${styles.section__txt} ${styles.section__left}`}>
          <h4 className={styles.section__heading4}>
            Take investment decisions with other members of the club
          </h4>
          <p className={styles.section__para}>
            Joining a club brings a whole lot of investment possibilities and
            you as an investor is not left out from the decision making process,
            Get exposed to other investment platforms and cast votes on which
            one to invest it
          </p>
        </div>
        <div className={`${styles.section__img} ${styles.section__imgRight}`}>
          <Image src={money} alt="money" height={150} width={200} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.section__img}>
          <Image src={card} alt="invest" height={150} width={200} />
        </div>
        <div className={`${styles.section__txt} ${styles.section__right}`}>
          <h4 className={styles.section__heading4}>
            Take investment decisions with other members of the club
          </h4>
          <p className={styles.section__para}>
            Joining a club brings a whole lot of investment possibilities and
            you as an investor is not left out from the decision making process,
            Get exposed to other investment platforms and cast votes on which
            one to invest it
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroDetails;
