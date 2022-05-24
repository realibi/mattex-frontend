import styles from './BuyMattressBody.module.css'
import {Image} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import helpers from "../../../helpers";
import axios from "axios";

const BuyMattressBody = ({mattress, ...props}) => {
    const [orderCallButtonPressed, setOrderCallButtonPressed] = useState(false);
    const [addToCardButtonPressed, setAddToCardButtonPressed] = useState(false);

    const [orderCallButtonText, setOrderCallButtonText] = useState('Позвоните мне');
    const [addToCartButtonText, setAddToCartButtonText] = useState('Добавить в корзину');

    const [messageForUser, setMessageForUser] = useState('');
    const [phone, setPhone] = useState(helpers.getCurrentUser().phone);

    const [selectedSize, setSelectedSize] = useState('');
    const [totalPrice, setTotalPrice] = useState(mattress.price);

    const calculateTotalCost = (selectedSizePrice) => {
        setTotalPrice((+mattress.price + +selectedSizePrice) * helpers.getCurrentUser().coefficient);
    }

    const orderButtonPressed = () => {
        mattress.selectedSize = selectedSize;
        mattress.totalPrice = totalPrice;

        let orderData = {
            catalogMattress: mattress,
            user: helpers.getCurrentUser(),
            phone: phone,
            size: selectedSize,
            totalSum: totalPrice,
        };

        axios.post(helpers.serverDomain + '/orders', orderData)
        .then(function (response) {
            setMessageForUser('Заявка отправлена! С вами скоро свяжутся!');
            setOrderCallButtonText('Заявка на звонок отправлена!');
            setOrderCallButtonPressed(true);
            helpers.sendTelegramNotification(phone, totalPrice);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const [sizesArray, setSizesArray] = useState([]);

    useEffect(() => {
        const heights = [190, 195, 200];
        let sizes = [];

        for(let height of heights){
            for(let size of mattress.sizes){
                sizes.push({size: `${size.width}*${height}`, price: size.price});
            }
        }

        calculateTotalCost(sizes[0].price);
        setSelectedSize(sizes[0].size);
        setSizesArray(sizes);
    }, []);

    return(
        <div className={styles.body}>
            <div className={styles.top}>
                <div className={styles.leftSide}>
                    <Image src={helpers.serverDomain + '/file/' + mattress.image} className={styles.image}/>

                    <select
                        onChange={(e)=>{
                            let selectedItem = JSON.parse(e.target.value);
                            calculateTotalCost(selectedItem.price);
                            setSelectedSize(selectedItem.size);
                        }}
                        className={styles.select}
                    >
                        {sizesArray.map((item, index) => (<option key={index} value={JSON.stringify(item)}>{item.size}</option>))}
                    </select>
                </div>
                <div className={styles.rightSide}>
                    <span className={styles.title}>{mattress.name}</span>
                    <div className={styles.params}>
                        <div className={styles.param}>
                            <span className={styles.paramTitle}>Ткань:</span>
                            <span className={styles.paramValue}>{mattress.cloth}</span>
                        </div>
                        <div className={styles.param}>
                            <span className={styles.paramTitle}>Высота:</span>
                            <span className={styles.paramValue}>{mattress.height}см</span>
                        </div>
                        <div className={styles.param}>
                            <span className={styles.paramTitle}>Жесткость:</span>
                            <span className={styles.paramValue}>{mattress.rigidity}</span>
                        </div>
                        <div className={styles.param}>
                            <span className={styles.paramTitle}>Нагрузка до:</span>
                            <span className={styles.paramValue}>{mattress.load}кг</span>
                        </div>
                        <div className={styles.param}>
                            <span className={styles.paramTitle}>Описание:</span>
                            <span className={styles.paramValue}>{mattress.description}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <span className={styles.resultSum}>Итого: {totalPrice} KZT</span>

                <input
                    type="text"
                    onChange={e => setPhone(e.target.value)}
                    placeholder={'Ваш номер телефона'}
                    className={styles.input}
                    value={phone}
                />
            </div>
            <div style={{textAlign: 'right', marginTop: 10}}>
                <button
                    className={styles.paymentButton}
                    onClick={() => {
                        //helpers.addToCart({selectedSize, totalPrice: price, ...mattress});
                        orderButtonPressed();
                    }}
                    disabled={orderCallButtonPressed}
                >
                    {orderCallButtonText}
                </button>
                <br/>
                <button
                    className={styles.paymentButton}
                    onClick={() => {
                        helpers.addToCart({selectedSize, totalPrice, ...mattress});
                        setAddToCartButtonText('Добавлено в корзину');
                        setAddToCardButtonPressed(true);
                    }}
                    disabled={addToCardButtonPressed}
                >
                    {addToCartButtonText}
                </button>
            </div>
            <div style={{textAlign: 'center'}}>
                <p style={{fontWeight: 700, color: 'green'}}>{messageForUser}</p>
            </div>
        </div>
    )
}

export default BuyMattressBody
