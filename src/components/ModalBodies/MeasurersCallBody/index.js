import styles from './MeasurersCallBody.module.css'
import {Image} from "react-bootstrap";
import React, {useState} from "react";
import helpers from "../../../helpers";

const MeasurersCallBody = () => {
    return(
        <div className={styles.body}>
            <span className={styles.title}>
                Чтобы вызвать мастера, заполните короткую форму.
                Укажите свои контактные данные, адрес замера и желаемую дату визита,
                а затем подтвердите заказ по телефону.
            </span>
        </div>
    )
}

export default MeasurersCallBody;