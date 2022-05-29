import Head from "next/head";
import React, {useEffect, useState} from "react";
import Header from "../../src/components/Header/Header";
import helpers from "../../src/helpers";
import CartItem from "../../src/components/CartItem/CartItem";
import axios from "axios";
import Link from "next/link";
import Footer from "../../src/components/Footer/Footer";

export default function cart(){

    const [cartArray, setCartArray] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [orderCreated, setOrderCreated] = useState(false);
    const [messageForUser, setMessageForUser] = useState('');
    const [phone, setPhone] = useState('');

    const getCartInfo = async () => {
        let cart = JSON.parse(localStorage.getItem(helpers.localStorageKeys.cart)) || [];
        setCartArray(cart);

        let totalSum = 0;
        cart.map(item => {
            let itemPriceNumber = +item.totalPrice.toString().replaceAll(' ', '');
            totalSum += itemPriceNumber;
        });
        setTotalSum(totalSum);
    }

    const clearCart = () => {
        setCartArray([]);
        localStorage.setItem(helpers.localStorageKeys.cart, JSON.stringify([]));
        getCartInfo();
    }

    const createOrder = () => {
        setMessageForUser('Ваш заказ оформлен!');
        setOrderCreated(true);
        helpers.sendTelegramNotification(phone, totalSum);

        for(let mattress of cartArray){
            let orderData = {
                catalogMattress: mattress,
                user: helpers.getCurrentUser(),
                phone: phone,
                size: mattress.selectedSize,
                totalSum: mattress.totalPrice,
            };

            axios.post(helpers.serverDomain + '/orders', orderData)
                .then(function (response) {

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        setPhone(helpers.getCurrentUser().phone)
        getCartInfo();
    }, [])

    const removeItem = (index) => {
        let cartArrayCopy = cartArray;
        cartArrayCopy.splice(index, 1);
        localStorage.setItem(helpers.localStorageKeys.cart, JSON.stringify(cartArrayCopy));
        setCartArray(cartArrayCopy);
        getCartInfo();
    }

    return(
        <>
            <Head>
                <title>Mattex - Корзина</title>
                <link rel="icon" href="/" />
            </Head>
            <Header/>

            <div style={{
                marginTop: 150,
                padding: '0 5% 0 5%',
                height: '85vh',
                marginBottom: -150
            }}>
                <h1 style={{
                    fontFamily: 'Montserrat-Bold',
                    marginBottom: 40
                }}>Корзина</h1>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}>
                    {cartArray.map((item, index) => (
                        <div style={{width: '49%', marginBottom: 10}}>
                            <CartItem
                                key={index}
                                item={item}
                                removeItemCallback={removeItem}
                                index={index}
                                setCartArrayCallback={setCartArray}
                            />
                        </div>
                    ))}
                </div>

                <hr/>

                {
                    cartArray.length !== 0 ? (
                        <div style={{textAlign: 'right'}}>
                            <h2 style={{fontFamily: 'Montserrat-Bold'}}>
                                Общая стоимость вашей корзины:
                                <span
                                    style={{
                                        color: 'green',
                                        marginLeft: 10
                                    }}
                                >
                                    {totalSum} KZT
                                </span>
                            </h2>

                            {!orderCreated ? (
                                <>
                                    {helpers.getCurrentUser().roleId !== 0 ? (
                                        <>
                                            <p style={{
                                                fontSize: 18,
                                                color: 'green',
                                                fontFamily: 'Montserrat-Bold'
                                            }}>
                                                {messageForUser}
                                            </p>
                                            <input
                                                type="phone"
                                                onChange={e => setPhone(e.target.value)}
                                                value={phone}
                                                style={{
                                                    padding: '10px',
                                                    width: 200,
                                                    fontSize: 18,
                                                    borderRadius: 10,
                                                    border: '1px solid grey'
                                                }}
                                                placeholder={'Ваш номер телефона'}
                                            />
                                            <br/><br/>
                                            <button
                                                style={{
                                                    backgroundColor: 'green',
                                                    border: '1px solid transparent',
                                                    color: '#fff',
                                                    padding: '10px 20px',
                                                    fontSize: 20,
                                                    borderRadius: 10,
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => createOrder()}
                                            >
                                                Оформить заказ
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <p style={{
                                                fontFamily: 'Montserrat-Bold',
                                                fontSize: 18
                                            }}>
                                                Чтобы оформить заказ, вам нужно <Link href={'/login'}>авторизоваться</Link>
                                            </p>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p style={{
                                        fontSize: 18,
                                        color: 'green',
                                        fontFamily: 'Montserrat-Bold'
                                    }}>
                                        {messageForUser}
                                    </p>
                                    <button
                                        onClick={() => clearCart()}
                                        style={{
                                            backgroundColor: 'red',
                                            border: '1px solid transparent',
                                            color: '#fff',
                                            padding: '10px 20px',
                                            fontSize: 20,
                                            borderRadius: 10,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Очистить корзину
                                    </button>
                                </>
                            )}

                        </div>
                    ) : (
                        <div style={{textAlign: 'center'}}>
                            <h2 style={{fontFamily: 'Montserrat-Bold'}}>
                                Ваша корзина пуста! <a href="/catalog">Перейти в каталог</a>
                            </h2>

                        </div>
                    )
                }
            </div>

            <Footer/>
        </>
    );
}
