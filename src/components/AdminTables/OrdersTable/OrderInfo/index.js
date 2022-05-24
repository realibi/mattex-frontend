import styles from './style.module.css'

export default function OrderInfo(props){
    return(
        <div>
            {props.order.mattress !== undefined ? (
                <>
                    <br/>
                    <p className={styles.title}>Основа</p>
                    <p className={styles.info}>{props.order.mattress.base.title}</p>
                    <br/>
                    <p className={styles.title}>Чехол</p>
                    <p className={styles.info}>{props.order.mattress.case.title}</p>
                    <br/>
                    <p className={styles.title}>Сторона 1</p>
                    <ul className={styles.list}>
                        {
                            props.order.mattress.side1.map(item => (
                                <li className={styles.info}>{item.title}</li>
                            ))
                        }
                    </ul>
                    <br/>
                    <p className={styles.title}>Сторона 2</p>
                    <ul className={styles.list}>
                        {
                            props.mattress.side2.map(item => (
                                <li className={styles.info}>{item.title}</li>
                            ))
                        }
                    </ul>
                    <br/>
                </>
            ) : (
                <>
                    <br/>
                    <p className={styles.title}>Название</p>
                    <p className={styles.info}>{props.order.catalogMattress.name}</p>
                    <br/>
                    <p className={styles.title}>Ткань</p>
                    <p className={styles.info}>{props.order.catalogMattress.cloth}</p>
                    <br/>
                    <p className={styles.title}>Себес матраса</p>
                    <p className={styles.info}>{props.order.catalogMattress.price}</p>
                    <br/>
                    <p className={styles.title}>Выбранный размер</p>
                    <p className={styles.info}>{props.order.size}</p>
                    <br/>
                    <p className={styles.title}>Цена с учетом размера и наценкой</p>
                    <p className={styles.info}>{props.order.totalSum}</p>
                    <br/>
                </>
            )}

        </div>
    );
}
