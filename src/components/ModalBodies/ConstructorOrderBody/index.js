import styles from './style.module.css'
import axios from "axios";
import helpers from "../../../helpers";
import {useState} from "react";

export default function ConstructorOrderBody(props){
    const [phone, setPhone] = useState('');
    const [messageForUser, setMessageForUser] = useState('');

    const orderButtonPressed = () => {
        axios.post(helpers.serverDomain + '/orders', {
            mattress: props.mattress,
            user: JSON.parse(localStorage.getItem(helpers.localStorageKeys.user)),
            phone: phone,
            totalSum: props.mattress.totalSum,
            size: `${props.mattress.width}x${props.mattress.length}`
        })
        .then(function (response) {
            setMessageForUser('Заявка отправлена! С вами скоро свяжутся!')
            helpers.sendTelegramNotification(phone, props.mattress.totalSum);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <div className={styles.container}>
            <div className={styles.body}>
                <div>
                    {/*<div className={styles.item}>*/}
                    {/*    <span className={styles.title}>Форма:</span>*/}
                    {/*    <span className={styles.subtitle}>{props.mattress.isRectangular ? 'Прямоугольник' : props.mattress.isCircular ? 'Круг' : 'Произвольная форма'}</span>*/}
                    {/*</div>*/}
                    {(!props.mattress.isNotStandartForm) ? (
                        <div className={styles.item}>
                            <span className={styles.title}>Размер:</span>
                            <span></span>
                            <span className={styles.subtitle}>{props.mattress.isCircular ?
                                `Диаметр: ${props.mattress.diameter} см` :
                                `Длина: ${props.mattress.length}. Ширина: ${props.mattress.width}`}</span>
                        </div>
                    ) : null}

                    <div className={styles.item}>
                        <span className={styles.title}>Основа:</span>
                        <span></span>
                        <span className={styles.subtitle}>{props.mattress.base.title}</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.title}>Чехол:</span>
                        <span></span>
                        <span className={styles.subtitle}>{props.mattress.case.title}</span>
                    </div>

                    <span className={styles.title}>Сторона 1:</span>
                    <ol className={styles.subtitle}>
                        {
                            props.mattress.side1.map(item => (<li>{item.title} ({item.thickness} см)</li>))
                        }
                    </ol>

                    <span className={styles.title}>Сторона 2:</span>
                    <ol className={styles.subtitle}>
                        {
                            props.mattress.side2.map(item => (<li>{item.title} ({item.thickness} см)</li>))
                        }
                    </ol>

                    <div style={{fontSize: 18, display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                        <span className={styles.subtitle}>
                            Итого: <b style={{fontFamily: 'Montserrat-Bold'}}>{helpers.prettify(props.mattress.totalSum)} KZT</b>
                        </span>
                    </div>
                </div>
                <div className={styles.footer}>
                    <input type="number" onChange={e => setPhone(e.target.value)} className={styles.input} placeholder={'Оставьте ваш номер телефона'}/>
                    <button onClick={() => orderButtonPressed()} className={styles.button}>Оформить заказ</button>
                </div>
            </div>
            <p style={{
                color: 'green',
                fontFamily: 'Montserrat-Bold',
                width: '100%',
                textAlign: 'center'
            }}>{messageForUser}</p>
        </div>
    );
}
