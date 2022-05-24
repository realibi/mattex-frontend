import styles from './StatsBlock.module.css'

export default function StatsBlock(){
    return(
        <div className={styles.container}>
            <div className={styles.item}>
                <span className={styles.itemTitle}>+3 000 000</span>
                <span className={styles.itemSubtitle}>довольных покупателей</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemTitle}>6</span>
                <span className={styles.itemSubtitle}>лет производства</span>
            </div>
            <div className={styles.item}>
                <span className={styles.itemTitle}>3</span>
                <span className={styles.itemSubtitle}>года гарантии</span>
            </div>
        </div>
    )
}