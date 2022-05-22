import React from "react"
import styles from "./Display.module.scss"
import Header from "../layout/Header"

const Display = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <div className={styles.left}>
                    <h3>The Stalwarts</h3>
                    <p>
                    Joining a club brings a whole lot of investment possibilities and you as an investor is not left out from the decision 
                    </p>
                    </div>

                    <div className={styles.right}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Display;

