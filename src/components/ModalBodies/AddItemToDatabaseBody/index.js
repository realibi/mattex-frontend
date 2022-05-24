import styles from './style.module.css'
import React, {useState} from "react";
import ModalWindow from "../../ModalWindow";
import AddCaseBody from "./AddCaseBody";
import AddLayerBody from "./AddLayerBody";
import AddBaseBody from "./AddBaseBody";
import AddCatalogMattressBody from "./AddCatalogMattressBody";

export default function AddItemToDatabaseBody(props){
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('Default body')
    const [modalTitle, setModalTitle] = useState('Default title')

    return(
        <div className={styles.container}>
            <div style={{
                display: showModal ? 'flex' : 'none',
                justifyContent: 'center'
            }}>
                <ModalWindow body={modalBody} setShowModal={setShowModal} title={modalTitle}/>
            </div>

            <h3>Что вы хотите добавить?</h3>

            <br/>

            <div className={styles.flex}>
                <button
                    className={styles.button}
                    onClick={() => {
                        setShowModal(true);
                        setModalBody(<AddCaseBody/>);
                    }}
                >
                    Чехол
                </button>

                <button
                    className={styles.button}
                    onClick={() => {
                        setShowModal(true);
                        setModalBody(<AddBaseBody/>);
                    }}
                >
                    Основы
                </button>
            </div>

            <br/> <br/>

            <div className={styles.flex}>
                <button
                    className={styles.button}
                    onClick={() => {
                        setShowModal(true);
                        setModalBody(<AddLayerBody/>);
                    }}
                >
                    Слой
                </button>

                <br/><br/>

                <button
                    className={styles.button}
                    onClick={() => {
                        setShowModal(true);
                        setModalBody(<AddCatalogMattressBody/>)
                    }}
                >
                    Матрас
                </button>
            </div>
        </div>
    );
}