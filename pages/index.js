import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../src/components/Header/Header'
import React, {useContext, useEffect, useState} from "react";
import classnames from 'classnames'
import {default as axios} from "axios";
import { useRouter } from 'next/router'
import Link from "next/link";
import AboutCompany from "../src/components/AboutCompany";
import StatsBlock from "../src/components/StatsBlock";
import MattressCard from "../src/components/MattressCard";
import ContactBlock from "../src/components/ContactBlock";
import WhyUs from "../src/components/WhyUs";
import Footer from "../src/components/Footer/Footer";
import ModalWindow from "../src/components/ModalWindow";
import {CSSTransition} from "react-transition-group";
import modalStyles from '../src/components/ModalWindow/ModalWindow.module.css'
import ConstructorBody from "../src/components/ModalBodies/ConstructorBody";
import helpers from "../src/helpers";

export default function Home() {
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('Default body')
    const [modalTitle, setModalTitle] = useState('Default title')

    const [mattresses, setMattresses] = useState([]);

    const openConstructorModal = () => {
        setModalBody(<ConstructorBody/>)
        setModalTitle('Конструктор матрасов')
        setShowModal(!showModal)
    }

    const loadMattresses = () => {
        axios.get(helpers.serverDomain+'/mattresses/catalogMattresses')
            .then(response => setMattresses(response.data));
    }

    useEffect(() => {
        loadMattresses();
    }, [])

    return (
        <div>
            <Head>
                <title>Mattex</title>
                <link rel="icon" href="/" />
            </Head>

            <CSSTransition in={showModal} timeout={200} unmountOnExit classNames={{
                enter: styles.alertEnter,
                enterActive: modalStyles.alertEnterActive,
                exit: modalStyles.alertExit,
                exitActive: modalStyles.alertExitActive,
            }}>
                <ModalWindow body={modalBody} setShowModal={setShowModal} title={modalTitle}/>
            </CSSTransition>

            <Header openConstructorModal={openConstructorModal}/>
            <AboutCompany/>
            <StatsBlock/>
            <div className={styles.container}>
                <div className={styles.titleBlock}>
                    <div className={styles.row}></div>
                    <span className={styles.title}>Лидеры продаж</span>
                    <div className={styles.row}></div>
                </div>

                <div className={styles.catalog}>
                    {
                        mattresses.slice(0,6).map((mattress, index) =>
                            <MattressCard
                                key={index}
                                mattress={mattress}
                                setShowModal={setShowModal}
                                setModalBody={setModalBody}
                                setModalTitle={setModalTitle}/>)
                    }

                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <a href="/catalog" className={styles.linkButton}>
                            Смотреть всё
                        </a>
                    </div>
                </div>
            </div>

            <ContactBlock setShowModal={setShowModal} setModalBody={setModalBody} setModalTitle={setModalTitle}/>
            <WhyUs/>

            <Footer/>
            <style jsx global>
                {`
                  body {
                    margin: 0px;
                    padding: 0px;
                  }
                  body::-webkit-scrollbar{
                   display: none;
                  }
                `}
            </style>
        </div>
    )
}
