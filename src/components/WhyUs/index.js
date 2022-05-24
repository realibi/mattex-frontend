import styles from './WhyUs.module.css'
import {Image} from "react-bootstrap";

const WhyUs = () => {
    return(
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.item}>
                    <Image src={'/money.png'} className={styles.itemImage}/>
                    <span className={styles.itemTitle}>Цены <br/> от производителей</span>
                </div>
                <div className={styles.item}>
                    <Image src={'/fast_delivery.png'} className={styles.itemImage}/>
                    <span className={styles.itemTitle}>Ваша покупка <br/> абсолютна безопасно!</span>
                </div>
                <div className={styles.item}>
                    <Image src={'/calendar.png'} className={styles.itemImage}/>
                    <span className={styles.itemTitle}>3 года <br/> гарантии качества</span>
                </div>
                <div className={styles.item}>
                    <Image src={'/shield.png'} className={styles.itemImage}/>
                    <span className={styles.itemTitle}>Ортопедическая <br/> конструкция матрасов</span>
                </div>
                <div className={styles.item}>
                    <Image src={'/payment.png'} className={styles.itemImage}/>
                    <span className={styles.itemTitle}>Оплата начичными <br/> при получении товара</span>
                </div>
            </div>
        </div>
    )
}

export default WhyUs;