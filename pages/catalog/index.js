import React, {useEffect, useState} from "react";
import Head from "next/head";
import {CSSTransition} from "react-transition-group";
import styles from "../../styles/Catalog.module.css";
import modalStyles from '../../src/components/ModalWindow/ModalWindow.module.css'
import ModalWindow from "../../src/components/ModalWindow";
import Header from "../../src/components/Header/Header";
import Footer from "../../src/components/Footer/Footer";
import CatalogBlock from "../../src/components/CatalogBlock";
import FilterBar from "../../src/components/FilterBar";
import ConstructorBody from "../../src/components/ModalBodies/ConstructorBody";
import {default as axios} from "axios";
import helpers from "../../src/helpers";

const Catalog = () => {
    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('Default body')
    const [modalTitle, setModalTitle] = useState('Default title')
    const [allMattresses, setAllMattresses] = useState([]);
    const [mattressesToShow, setMattressesToShow] = useState(allMattresses);

    const openConstructorModal = () => {
        setModalBody(<ConstructorBody/>)
        setModalTitle('Конструктор матрасов')
        setShowModal(!showModal)
    }

    useEffect(()=>{
        axios.get(helpers.serverDomain+'/mattresses/catalogMattresses')
            .then(response => {
                setAllMattresses(response.data);
                setMattressesToShow(response.data);
            });
    }, [])
    return (
        <div>
            <Head>
                <title>Mattex - Каталог</title>
                <link rel="icon" href="/" />
            </Head>

            <CSSTransition in={showModal} timeout={200} unmountOnExit classNames={{
                enter: modalStyles.alertEnter,
                enterActive: modalStyles.alertEnterActive,
                exit: modalStyles.alertExit,
                exitActive: modalStyles.alertExitActive,
            }}>
                <ModalWindow body={modalBody} setShowModal={setShowModal} title={modalTitle}/>
            </CSSTransition>

            <Header openConstructorModal={openConstructorModal}/>

            <div className={styles.main}>
                <div className={styles.filter}>
                    <FilterBar setMattresses={setMattressesToShow} matresses={allMattresses} setLoading={setLoading}/>
                </div>
                <div className={styles.catalog}>
                    {loading ? (
                        <div className={styles.loading}>
                            Загрузка...
                        </div>
                    ) : (
                        <CatalogBlock mattresses={mattressesToShow} setShowModal={setShowModal} setModalBody={setModalBody} setModalTitle={setModalTitle} setLoading={setLoading}/>
                    )}
                </div>
            </div>

            <Footer/>
            <style jsx global>
                {`
                  body {
                    margin: 0px;
                    padding: 0px;
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

export default Catalog;
