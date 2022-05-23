import React from "react";
import Card from "../Card/Card";
import styles from "./TrendStake.module.scss";
import btn from "../../styles/button.module.scss";

function TrendStake() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.heading2}>Trending</h3>
      </div>
      <Card>
        <div className={styles.stake}>
          <div className={styles.stake__head}>
            <h2 className={styles.stake__heading}>The Stalwarts</h2>
            <p className={styles.stake__paragraph}>
              Joining a club brings a whole lot of investment possibilities and
              you as an investor is not left out from the decision{" "}
            </p>
          </div>

          <div className={styles.member}>
            <h2 className={styles.member__header}>Members</h2>
            <p className={styles.member__num}>25</p>
          </div>

          <div className={styles.member}>
            <h2 className={styles.member__header}>Available Stake</h2>
            <p className={styles.member__num}>25</p>
          </div>

          <div className={styles.button}>
            <button className={`${btn.btn} ${btn.btn__peach}`}>
              Request to join
            </button>
          </div>
        </div>
      </Card>
      <Card>
        <div className={styles.stake}>
          <div className={styles.stake__head}>
            <h2 className={styles.stake__heading}>The Stalwarts</h2>
            <p className={styles.stake__paragraph}>
              Joining a club brings a whole lot of investment possibilities and
              you as an investor is not left out from the decision{" "}
            </p>
          </div>

          <div className={styles.member}>
            <h2 className={styles.member__header}>Members</h2>
            <p className={styles.member__num}>25</p>
          </div>

          <div className={styles.member}>
            <h2 className={styles.member__header}>Available Stake</h2>
            <p className={styles.member__num}>25</p>
          </div>

          <div className={styles.button}>
            <button className={`${btn.btn} ${btn.btn__peach}`}>
              Request to join
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TrendStake;
