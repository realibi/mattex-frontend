import styles from './ContactFormBody.module.css'
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import {useState} from "react";

const ContactFormBody = (props) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')

    return(
        <div className={styles.body}>
            <div className={styles.header}>
                <div className={styles.leftSide}>
                    <span className={styles.title}>Заявка на бесплатную консультацию</span>
                    <div className={styles.inputs}>
                        <input type="text" className={styles.input} placeholder={'Контактное лицо'} onChange={setName}/>
                        <input type="text" className={styles.input} placeholder={'Номер телефона'} onChange={setPhone}/>
                        <textarea className={styles.input} rows="5" placeholder={'Краткое сообщение'} onChange={setMessage}></textarea>
                    </div>
                    <button className={styles.paymentButton}>Оставить заявку</button>
                </div>
                <div className={styles.rightSide}>
                    <YMaps style={{borderRadius: '30px' }}>
                        <Map width={'100%'} defaultState={{ center: [51.180001, 71.466883], zoom: 16 }}>
                            <Placemark geometry={[51.180001, 71.466883]} style={{borderRadius: '30px' }}/>
                        </Map>
                    </YMaps>
                </div>
            </div>
        </div>
    )
}

export  default ContactFormBody;