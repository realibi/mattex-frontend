import styles from './Header.module.css'
import classnames from 'classnames'
import {Image} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import ModalWindow from "../ModalWindow";
import CartBody from "../ModalBodies/CartBody/CartBody";
import helpers from "../../helpers";
import Link from "next/link";

function Header (props) {

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cartArray, setCartArray] = useState([]);
    const [accountLink, setAccountLink] = useState({text: 'Войти', href: '/login'});
    const [cartBody, setCartBody] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        let currentUser = localStorage.getItem(helpers.localStorageKeys.user);
        if(currentUser !== null){
            setLoggedIn(true);
            let userFullName = JSON.parse(localStorage.getItem(helpers.localStorageKeys.user)).fullName;
            setAccountLink({
                text: `Личный кабинет ${userFullName}`,
                href: '/cabinet'});
        }
    }, [])

    return (
        <div className={styles.header}>
            <div style={{display: showModal ? 'block' : 'none'}}>
                <ModalWindow body={cartBody} setShowModal={setShowModal} title={'Корзина'}/>
            </div>
            <div className={styles.headerTitle}>
                <div className={styles.row}/>
                <span className={styles.logo}>Mattex</span>
                <div className={styles.row}/>
            </div>
            <div className={styles.footer}>
                <Image src={'/menu.png'} className={classnames(styles.menuButton, showMobileMenu === false ? null : styles.rotate)} onClick={()=>{setShowMobileMenu(!showMobileMenu)}}/>
                <div className={styles.menu}>
                    <a href={'/'} className={styles.menuItem}>Главная</a>
                    <a href={'/catalog'} className={styles.menuItem}>Каталог</a>
                    <a onClick={() => props.openConstructorModal()} className={styles.menuItem}>Конструктор</a>
                    <a href={'https://www.instagram.com/mattex.kz/'}>
                        <div className={styles.buttonItem}>
                            <img
                                src="/inst.png"
                                className={styles.buttonImage}
                            />
                        </div>
                    </a>
                </div>
                <div className={styles.buttons}>
                    {/*<div className={styles.buttonItem}>*/}
                    {/*    <img src="/phone-white.png" alt="" className={styles.buttonImage}/>*/}
                    {/*</div>*/}

                    {/*<div className={styles.buttonItem}>*/}
                    {/*    <img src="/geo-white.png" alt="" className={styles.buttonImage}/>*/}
                    {/*</div>*/}

                    <Link href={accountLink.href}>
                        <span
                            className={styles.menuItem}
                            style={{
                                fontWeight: 700
                            }}
                        >{accountLink.text}</span>
                    </Link>

                    <Link href={'/cart'}>
                        <div className={styles.buttonItem}>
                            <img
                                src="/bag.png"
                                className={styles.buttonImage}
                            />
                        </div>
                    </Link>

                    {loggedIn && (
                        <Link href={'/login'}>
                            <div className={styles.buttonItem}>
                                <img
                                    src="/door.png"
                                    className={styles.buttonImage}
                                />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            <div className={classnames(styles.mobileMenu, showMobileMenu===false ? null : styles.heightAuto)}>
                    <a href={'/'} className={styles.menuItem}>Главная</a>
                    <a href={'/catalog'} className={styles.menuItem}>Каталог</a>
                    <a onClick={() => props.openConstructorModal()} className={styles.menuItem}>Конструктор</a>
            </div>
        </div>
    )
}

export default Header;
