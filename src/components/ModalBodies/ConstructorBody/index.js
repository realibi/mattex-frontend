import styles from './ConstructorBody.module.css'
import {Image} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import helpers from "../../../helpers";
import ConstructorOrderBody from "../ConstructorOrderBody";
import modalStyles from "../../ModalWindow/ModalWindow.module.css";
import ModalWindow from "../../ModalWindow";
import {CSSTransition} from "react-transition-group";
import SelectMattressCaseBody from "../SelectMattressCaseBody";
import SelectMattressLayerBody from "../SelectMattressLayerBody";
import SelectMattressBaseBody from "../SelectMattressBaseBody";
import axios from "axios";

const ConstructorBody = () => {
    const [coefficient, setCoefficient] = useState(2);
    const [mattressBase, setMattressBase] = useState(null)
    const [mattressCase, setMattressCase] = useState(null)
    const [selectedMattressLayers1, setSelectedMattressLayers1] = useState([])
    const [selectedMattressLayers2, setSelectedMattressLayers2] = useState([])
    const [mattressCases, setMattressCases] = useState([])
    const [mattressBases, setMattressBases] = useState([])
    const [mattressLayers, setMattressLayers] = useState([]);
    const [length, setLength] = useState(190)
    const [width, setWidth] = useState(80)

    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState(null)
    const [modalTitle, setModalTitle] = useState('Default title')

    const onChangeState = (state, func) => {
        func(state.target.value)
    }

    const loadData = async () => {
        axios.get(helpers.serverDomain + '/mattresses/cases').
        then(res => {
            setMattressCases(res.data);
            console.log('mattress cases: ', res.data)
        }).catch(() => {
            alert('Что-то пошло нетак при загрузке чехлов!');
        });

        axios.get(helpers.serverDomain + '/mattresses/layers').
        then(res => {
            setMattressLayers(res.data);
        }).catch(() => {
            alert('Что-то пошло нетак при загрузке слоев!');
        });

        axios.get(helpers.serverDomain + '/mattresses/bases').
        then(res => {
            setMattressBases(res.data);
        }).catch(() => {
            alert('Что-то пошло нетак при загрузке основ!');
        })

        let currentUser = JSON.parse(localStorage.getItem(helpers.localStorageKeys.user));
        if(currentUser !== null){
            axios.get(helpers.serverDomain + `/users/${currentUser._id}/coefficient`).
            then(res => {
                setCoefficient(res.data);
            }).catch(() => {
                alert('Что-то пошло нетак при загрузке коэффициента!');
            })
        }
    }

    const orderButtonPressed = () => {
        if(mattressCase !== null &&
            mattressBase !== null &&
            selectedMattressLayers1.length > 0 &&
            selectedMattressLayers2.length > 0){
            let mattress = {
                base: mattressBase,
                case: mattressCase,
                side1: selectedMattressLayers1,
                side2: selectedMattressLayers2,
                length,
                width,
                totalSum: getTotalPrice()
            }
            setModalTitle("Ваш заказ");
            setModalBody(<ConstructorOrderBody mattress={mattress}/>);
        }else{
            setModalTitle("Ошибка");
            setModalBody(<span className={styles.subtitle}>Заполните все данные о матрасе</span>);
        }

        setShowModal(true);
    }

    const addTermovoilokLayer = () => {
        let termovoilokCountLayer1 = 0;
        let termovoilokCountLayer2 = 0;

        selectedMattressLayers1.map(item => {
            if(item.title.includes('Термовойлок')){
                termovoilokCountLayer1++;
            }
        })

        selectedMattressLayers2.map(item => {
            if(item.title.includes('Термовойлок')){
                termovoilokCountLayer2++;
            }
        })

        if(termovoilokCountLayer1 === 0){
            selectedMattressLayers1.push({
                title: 'Термовойлок',
                description: "Этот нетканый материал изготавливается путем смешивания волокон натура...",
                thickness: 0,
                price: 460,
                imgSrc: "https://drema.pro/foto/covers/2305_main.jpg"
            });
        }

        if(termovoilokCountLayer2 === 0){
            selectedMattressLayers2.push({
                title: 'Термовойлок',
                description: "Этот нетканый материал изготавливается путем смешивания волокон натура...",
                thickness: 0,
                price: 460,
                imgSrc: "https://drema.pro/foto/covers/2305_main.jpg"
            });
        }
    }

    const getTotalPrice = () => {
        let totalPrice = 0;

        selectedMattressLayers1.map(item => totalPrice += item.price);
        selectedMattressLayers2.map(item => totalPrice += item.price);

        totalPrice += mattressCase === null ? 0 : mattressCase.price;
        totalPrice += mattressBase === null ? 0 : mattressBase.price;

        totalPrice *= coefficient;

        return totalPrice;
    }

    useEffect(() => {
        loadData();
    }, [])

    return(
        <div className={styles.body}>
            <div style={{
                display: showModal ? 'flex' : 'none',
                width: '100%',
                justifyContent: 'center'
            }}>
                <ModalWindow body={modalBody} setShowModal={setShowModal} title={modalTitle}/>
            </div>
            <div className={styles.imageBlock} style={{backgroundImage: 'url("https://st2.depositphotos.com/1579454/8355/i/600/depositphotos_83552612-stock-photo-mattress-isolated-on-white.jpg")'}}>
            </div>
            <div className={styles.footer}>
                <span className={styles.title}>Выберите подходящие для Вас параметры матраса</span>

                <div className={styles.params}>
                    <div className={styles.footerLeftSide}>
                        <h1 className={styles.subtitle}>Размеры (см):</h1>

                        <div className={styles.wrapperItem}>
                            <select onChange={e => setWidth(e.target.value)} className={styles.select}>
                                <option value="80">80</option>
                                <option value="90">90</option>
                                <option value="110">110</option>
                                <option value="120">120</option>
                                <option value="140">140</option>
                                <option value="160">160</option>
                                <option value="180">180</option>
                                <option value="200">200</option>
                            </select>
                            x
                            <select onChange={e => setLength(e.target.value)} className={styles.select}>
                                <option value="190">190</option>
                                <option value="195">195</option>
                                <option value="200">200</option>
                            </select>
                            см.
                        </div>

                        <br/>

                        <h1 className={styles.subtitle}>Выбор наполнителей:</h1>

                        <div className={styles.downWrapper}>
                            <div className={styles.downWrapperItem}>
                                <span className={styles.downWrapperTitle}>Чехол</span>
                                <span className={styles.link} onClick={()=>{
                                    setShowModal(true)
                                    setModalTitle('Выбор чехла')
                                    setModalBody(<SelectMattressCaseBody cases={mattressCases} setMattressCase={setMattressCase} setShowModal={setShowModal}/>)
                                }}>{mattressCase === null ? 'Выбрать чехол' : mattressCase.title}</span>
                            </div>

                            <hr/>

                            <div className={styles.downWrapperItem}>
                                <span className={styles.downWrapperTitle}>Сторона 1</span>

                                <div>
                                    {
                                        selectedMattressLayers1.map((item, index) => (
                                            <div>
                                                    <span className={styles.link} onClick={()=>{
                                                        setShowModal(true)
                                                        setModalTitle('Выбор слоя')
                                                        setModalBody(<SelectMattressLayerBody
                                                            layers={mattressLayers}
                                                            currentLayerIndex={index}
                                                            selectedLayers={selectedMattressLayers1}
                                                            setShowModal={setShowModal}/>)

                                                    }}>{item.title}</span>
                                            </div>
                                        ))
                                    }

                                    <span className={styles.link} onClick={()=>{
                                        setShowModal(true)
                                        setModalTitle('Выбор слоя')
                                        setModalBody(<SelectMattressLayerBody
                                            layers={mattressLayers}
                                            selectedLayers={selectedMattressLayers1}
                                            setShowModal={setShowModal}/>)
                                    }}>{'Добавить слой'}</span>
                                </div>
                            </div>

                            <hr/>

                            <div className={styles.downWrapperItem}>
                                <span className={styles.downWrapperTitle}>Основание</span>
                                <span className={styles.link} onClick={()=>{
                                    setShowModal(true)
                                    setModalTitle('Выбор основания')
                                    setModalBody(<SelectMattressBaseBody addTermovoilokLayer={addTermovoilokLayer} bases={mattressBases} setMattressBase={setMattressBase} setShowModal={setShowModal}/>)
                                }}>{mattressBase === null ? 'Выбрать основание' : mattressBase.title}</span>
                            </div>

                            <hr/>

                            <div className={styles.downWrapperItem}>
                                <span className={styles.downWrapperTitle}>Сторона 2</span>

                                <div>
                                    {
                                        selectedMattressLayers2.map((item, index) => (
                                            <div>
                                                    <span className={styles.link} onClick={()=>{
                                                        setShowModal(true)
                                                        setModalTitle('Выбор слоя')
                                                        setModalBody(<SelectMattressLayerBody
                                                            layers={mattressLayers}
                                                            currentLayerIndex={index}
                                                            selectedLayers={selectedMattressLayers2}
                                                            setShowModal={setShowModal}/>)
                                                    }}>{item.title}</span>
                                            </div>
                                        ))
                                    }

                                    <span className={styles.link} onClick={()=>{
                                        setShowModal(true)
                                        setModalTitle('Выбор слоя')
                                        setModalBody(<SelectMattressLayerBody
                                            layers={mattressLayers}
                                            selectedLayers={selectedMattressLayers2}
                                            setShowModal={setShowModal}/>)
                                    }}>{'Добавить слой'}</span>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    </div>
                </div>

                <br/>

                <div className={styles.bottom_block}>
                    <div>
                        <div className={styles.footerRightSide}>
                            <div className={styles.priceBlock}>
                                <span className={styles.price}>Итого: {helpers.prettify(getTotalPrice())}KZT</span>
                            </div>
                        </div>

                        <br/>

                        <div className={styles.priceBlock} style={{width: '100%'}}>
                            <button
                                className={styles.paymentButton}
                                onClick={orderButtonPressed}
                            >
                                Перейти к оплате
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConstructorBody;