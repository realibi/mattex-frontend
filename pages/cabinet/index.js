import styles from '../../styles/Cabinet.module.css'
import Header from "../../src/components/Header/Header";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import Footer from "../../src/components/Footer/Footer";
import {Image} from "react-bootstrap";
import modalStyles from "../../src/components/ModalWindow/ModalWindow.module.css";
import ModalWindow from "../../src/components/ModalWindow";
import {CSSTransition} from "react-transition-group";
import SalesTable from "../../src/components/AdminTables/SalesTable";
import axios from "axios";
import helpers from "../../src/helpers";

const Cabinet = () => {
    const [name, setName] = useState('Не указано');
    const [phone, setPhone] = useState('Не указан');
    const [email, setEmail] = useState('Не указан');
    const [coefficient, setCoefficient] = useState(0);

    const [editingProfileData, setEditingProfileData] = useState(false);

    const [editName, setEditName]  = useState(false);
    const [editPhone, setEditPhone]  = useState(false);
    const [editEmail, setEditEmail]  = useState(false);

    const [dataIsEdited, setDataIsEdited] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalBody, setModalBody] = useState('Default body');
    const [modalTitle, setModalTitle] = useState('Default title');

    const [sales, setSales] = useState([]);

    const loadSales = () => {
        let ordersLoadUrl = helpers.serverDomain + '/orders/user/' + helpers.getCurrentUser()._id;
        console.log(ordersLoadUrl);
        axios.get(ordersLoadUrl)
            .then(function (response) {
                setSales(response.data)
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    const loadUserInfo = () => {
        axios.get(helpers.serverDomain + '/users/' + helpers.getCurrentUser()._id)
            .then(function (response) {
                let userInfo = response.data;
                setName(userInfo.fullName);
                setPhone(userInfo.phone);
                setEmail(userInfo.email);
                setCoefficient(userInfo.coefficient);
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    useEffect(() => {
        helpers.checkAuthorization(helpers.roles.AUTHORIZED);
        loadUserInfo();
        loadSales();
    }, [])

    const toEdit = (getter, setter) => {
        setter(!getter);
        setDataIsEdited(true);

        setEditingProfileData(!editingProfileData);

        if(getter){
            axios.put(helpers.serverDomain + '/users/edit', {
                fullName: name,
                phone,
                id: helpers.getCurrentUser()._id
            }).then(() => {
                alert('Профиль успешно обновлен!');
            })
        }

    }
    return (
        <div className={styles.body}>
            <CSSTransition in={showModal} timeout={200} unmountOnExit classNames={{
                enter: styles.alertEnter,
                enterActive: modalStyles.alertEnterActive,
                exit: modalStyles.alertExit,
                exitActive: modalStyles.alertExitActive,
            }}>
                <ModalWindow body={modalBody} setShowModal={setShowModal} title={modalTitle}/>
            </CSSTransition>

            <Header/>
            <Head>
                <title>Mattex - Кабинет</title>
                <link rel="icon" href="/" />
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.leftSide}>
                    <span className={styles.title}>Личный кабинет</span>
                    <div className={styles.personalInfo}>
                        <div className={styles.inputBody}>
                            <input className={styles.fioInput} disabled={!editName} value={name} placeholder={'ФИО'} onChange={e => setName(e.target.value)}/>
                            <Image src={'/editing.png'} className={styles.editingImg} onClick={()=>{toEdit(editName, setEditName)}}/>
                        </div>
                        <div className={styles.inputBody} style={{marginTop: 10}}>
                            <div className={styles.subInputBody}>
                                <span className={styles.subtitle}>Телефон: </span>
                                <input className={styles.subInput} disabled={!editPhone} value={phone} placeholder={'Номер телефона'} onChange={e => setPhone(e.target.value)}/>
                            </div>

                            <Image src={'/editing.png'} className={styles.editingImg} onClick={()=>{toEdit(editPhone, setEditPhone)}}/>
                        </div>
                        <div className={styles.inputBody}>
                            <div className={styles.subInputBody}>
                                <span className={styles.subtitle}>Email: </span>
                                <input className={styles.subInput} disabled={!editEmail} value={email} placeholder={'Email'} onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <Image src={'/editing.png'} className={styles.editingImg} onClick={()=>{toEdit(editEmail, setEditEmail)}}/>
                        </div>
                        <div className={styles.inputBody} style={{marginTop: 10}}>
                            <div className={styles.subInputBody}>
                                <span className={styles.subtitle}>Коэффициент: </span>
                                <input className={styles.subInput} disabled={true} value={coefficient} placeholder={'Коэффициент'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <h2>История покупок</h2>
                    <SalesTable sales={sales} admin={false}/>
                </div>
            </div>

            <Footer/>

            <style jsx global>
                {`
                  body {
                    margin: 0;
                    padding: 0;
                    overflow-y: ${showModal ? 'hidden' : 'scroll'};
                  }
                  body::-webkit-scrollbar{
                   display: none;
                  }
                `}
            </style>
        </div>
    )
}

export default Cabinet;
