import styles from './Footer.module.css'
import {Image} from "react-bootstrap";

export default function Footer(props) {
    return(
        <div className={styles.footer}>
            <div className={styles.logoBlock}>
                <span className={styles.logo}>Mattex</span> <br/>
                <span className={styles.text}>Copyright (c) 2019</span>
            </div>
            <nav className={styles.nav}>
                <div className={styles.navList}>
                    <a href="/" className={styles.navItem}>Главная</a> <br/>
                    <a href="/" className={styles.navItem}>о нас</a>
                </div>
                <div className={styles.navList}>
                    <a href="/" className={styles.navItem}>Кталог</a><br/>
                    <a href="/" className={styles.navItem}>Доставка</a>
                </div>
                <div className={styles.navList}>
                    <a href="/" className={styles.navItem}>Отзывы</a><br/>
                    <a href="/" className={styles.navItem}>Контакты</a>
                </div>
            </nav>
            <div className={styles.nav}>
                <div className={styles.navList}>
                    <span className={styles.text}>г. Нур-Султан,</span> <br/>
                    <span className={styles.text}>пр. Әл-Фараби, 51</span>
                </div>
                <div className={styles.navList}>
                    <span className={styles.text}>+7 (7172) 45 65 85</span> <br/>
                    <span className={styles.text}>+7 (701) 251 97 82</span>
                </div>
            </div>
        </div>
    )
}
