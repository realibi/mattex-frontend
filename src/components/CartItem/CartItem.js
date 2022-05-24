import styles from './style.module.css'
import classnames from 'classnames';
import helpers from "../../helpers";
import {Image} from "react-bootstrap";

export default function CartItem({item, index, removeItemCallback}){
    return(
        <div className={styles.container}>
            <button
                className={styles.remove_button}
                onClick={() => removeItemCallback(index)}
            >X</button>

            <div
                className={styles.image_block}
                style={{
                    backgroundImage: `url(${helpers.serverDomain + '/file/' + item.image })`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
            </div>
            <div className={styles.info_block}>
                <p className={styles.title}>{item.name}</p>
                <p className={styles.primary_text}>Ткань: {item.cloth}</p>
                {/*<p className={styles.primary_text}>Высота: {item.height}</p>*/}
                <p className={styles.primary_text}>Жесткость: {item.rigidity}</p>
                <p className={styles.primary_text}>Нагрузка до: {item.load}</p>
                <p className={styles.primary_text}>Размер: {item.selectedSize}</p>
                <p className={styles.title}>Цена: <span className={classnames(styles.price, styles.title)}>{item.totalPrice} KZT</span></p>
            </div>
        </div>
    );
}
