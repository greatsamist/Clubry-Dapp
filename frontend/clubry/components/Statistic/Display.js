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
                        <p><span>Amount left in vault</span><span>$1400</span></p>
                        <p><span>Sellers stake</span><span>15%</span></p>
                    </div>
                </div>

                <div className={styles.body}>
                    <div className={styles.invest} >
                        <div className={styles.platform}>
                            <div>
                                <h4>Platform</h4>
                                <p>Aave</p>
                                <p>Uniswap pool</p>
                                <p>Compound</p>
                                <p>Yearn Finance</p>
                                <h3>Total Investments</h3>
                            </div>
                            <div>
                                <h4>Amount Invested</h4>
                                <p>$39,0000,000</p>
                                <p>$23,899,473</p>
                                <p>$16,108,320</p>
                                <p>$27,839,111</p>
                                <h3>$1,367,284,294</h3>
                            </div>
    
                        </div>

                        <div className={styles.display}>
                            <div className={styles.flex} >
                                <p>Total value: <span>$30,000</span></p>
                                <p>Seller stake: <span>15%</span></p>
                            </div>

                            <p>$30,000 * 15</p>
                            <p>Amount to be paid: $45,000</p>

                            <div className={styles.btn}>Proceed to pay</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Display;

