import styles from './style.module.css';
import React, {useEffect, useState} from "react";
import Header from "../../src/components/Header/Header";
import axios from "axios";
import helpers from "../../src/helpers";
import {useRouter} from "next/router";
import modalStyles from "../../src/components/ModalWindow/ModalWindow.module.css";
import ModalWindow from "../../src/components/ModalWindow";
import {CSSTransition} from "react-transition-group";
import ConstructorBody from "../../src/components/ModalBodies/ConstructorBody";
import Head from "next/head";

export default function Login(){
    const router = useRouter();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [isRegistration, setIsRegistration] = useState(false);

    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('Default body')
    const [modalTitle, setModalTitle] = useState('')

    const [messageForUser, setMessageForUser] = useState('');

    const openConstructorModal = () => {
        setModalBody(<ConstructorBody/>)
        setModalTitle('Конструктор матрасов')
        setShowModal(!showModal)
    }

    const loginButtonPressed = () => {
        axios.post(helpers.serverDomain + '/users/login', {
            login,
            password
        })
            .then(function (response) {
                if(response.data !== false){
                    localStorage.setItem(helpers.localStorageKeys.user, JSON.stringify(response.data));
                    if(response.data.role === 1){
                        router.push('/admin');
                    }else if(response.data.role === 2){
                        router.push('/');
                    }

                }else{
                    setMessageForUser('Неверные данные для входа!');
                }
            })
            .catch(function (error) {
                alert("Что-то пошло нетак!");
            });
    }

    const registrationButtonPressed = () => {
        axios.post(helpers.serverDomain + '/users', {
            login,
            password,
            fullName,
            phone,
            coefficient: 1,
            role: 2
        })
            .then(function (response) {
                localStorage.setItem(helpers.localStorageKeys.user, JSON.stringify(response.data));
                router.push('/');
            })
            .catch(function (error) {
                alert("Что-то пошло нетак!");
            });
    }

    useEffect(() => {
        localStorage.removeItem(helpers.localStorageKeys.user);
    }, []);

    return(
        <div className={styles.container}>
            <Head>
                <title>Mattex - Авторизация</title>
                <link rel="icon" href="/" />
            </Head>

            <Header openConstructorModal={openConstructorModal}/>

            <CSSTransition in={showModal} timeout={200} unmountOnExit classNames={{
                enter: modalStyles.alertEnter,
                enterActive: modalStyles.alertEnterActive,
                exit: modalStyles.alertExit,
                exitActive: modalStyles.alertExitActive,
            }}>
                <ModalWindow body={modalBody} setShowModal={setShowModal} title={modalTitle}/>
            </CSSTransition>

            <div className={styles.login_block}>
                <p className={styles.title}>{isRegistration ? 'Регистрация' : 'Вход'}</p>

                <p className={styles.message}>{messageForUser}</p>

                <input type="text" className={styles.input} onChange={e => setLogin(e.target.value)} placeholder={'Логин'}/>
                <input type="password" className={styles.input} onChange={e => setPassword(e.target.value)} placeholder={'Пароль'}/>

                {
                    isRegistration ? (
                        <>
                            <input type="text" className={styles.input} onChange={e => setFullName(e.target.value)} placeholder={'ФИО'}/>
                            <input type="text" className={styles.input} onChange={e => setPhone(e.target.value)} placeholder={'Телефон'}/>
                        </>
                    ) : null
                }

                <button
                    className={styles.button}
                    onClick={() => {
                        if(isRegistration){
                            registrationButtonPressed();
                        }else{
                            loginButtonPressed();
                        }
                    }}
                >
                    {isRegistration ? 'Зарегистрироваться' : 'Войти'}
                </button>

                <p
                    className={styles.registration_link}
                    onClick={() => setIsRegistration(!isRegistration)}
                >
                    {isRegistration ? 'Войти' : 'Зарегистрироваться'}
                </p>
            </div>
        </div>
    );
}
