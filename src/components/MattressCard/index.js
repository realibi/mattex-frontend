import styles from './MattressCard.module.css'
import {Image} from "react-bootstrap";
import helpers from "../../helpers";
import React, {useEffect, useState} from "react";
import ModalWindow from "../ModalWindow";
import BuyMattressBody from "../ModalBodies/BuyMattressBody";

const MattressCard = ({mattress, setShowModal, setModalTitle, setModalBody}) => {
    function openModal(){
        setModalTitle('Покупка товара')
        setModalBody(<BuyMattressBody mattress={mattress}/>)
        setShowModal(true)
    }

    return (
        <div className={styles.container}>
            <Image src={helpers.serverDomain + '/file/' + mattress.image} className={styles.image}/>
            <div className={styles.about}>
                <span className={styles.title}>{mattress.name}</span>
                <div className={styles.params}>
                    <div className={styles.param}>
                        <span className={styles.paramValue}>Ткань:</span>
                        <span className={styles.paramValue}>{mattress.cloth}</span>
                    </div>
                    <div className={styles.param}>
                        <span className={styles.paramValue}>Высота:</span>
                        <span className={styles.paramValue}>{mattress.height}см</span>
                    </div>
                    <div className={styles.param}>
                        <span className={styles.paramValue}>Жесткость:</span>
                        <span className={styles.paramValue}>{mattress.rigidity}</span>
                    </div>
                    <div className={styles.param}>
                        <span className={styles.paramValue}>Нагрузка до:</span>
                        <span className={styles.paramValue}>{mattress.load}кг</span>
                    </div>
                </div>
                {/*<span className={styles.title}>Размеры</span> <br/>*/}
                {/*<select*/}
                {/*    onChange={(e) => {*/}
                {/*        setPrice(mattress.price + Number(e.target.value));*/}
                {/*        setSize(e.target.value)*/}
                {/*    }}*/}
                {/*    className={styles.select}>*/}
                {/*    <option value={0}>Выберите</option>*/}
                {/*    {*/}
                {/*        sizesArray.map((item, index) => (<option key={index} value={item.price}>{item.size}</option>))*/}
                {/*    }*/}
                {/*</select>*/}
                <button onClick={openModal} className={styles.select}>Купить</button>

                <div className={styles.footer}>
                    <div className={styles.button}>
                        <Image src={'/cart.png'} className={styles.buttonImage}/>
                    </div>
                    <span className={styles.price}>{(mattress.sizes[0].price + mattress.price) * helpers.getCurrentUser().coefficient}тг</span>
                </div>
            </div>
        </div>
    )
}

export default MattressCard;
