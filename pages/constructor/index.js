import Head from "next/head";
import React, {useEffect, useState} from "react";
import styles from "../../styles/Constructor.module.css";
import modalStyles from "../../src/components/ModalWindow/ModalWindow.module.css";
import ModalWindow from "../../src/components/ModalWindow";
import {CSSTransition} from "react-transition-group";
import Header from "../../src/components/Header/Header";
import Footer from "../../src/components/Footer/Footer";
import classnames from 'classnames'
import MeasurersCallBody from "../../src/components/ModalBodies/MeasurersCallBody";
import SelectMattressCaseBody from "../../src/components/ModalBodies/SelectMattressCaseBody";
import SelectMattressLayerBody from "../../src/components/ModalBodies/SelectMattressLayerBody";
import SelectMattressBaseBody from "../../src/components/ModalBodies/SelectMattressBaseBody";
import axios from "axios";
import helpers from "../../src/helpers";
import ConstructorOrderBody from "../../src/components/ModalBodies/ConstructorOrderBody";

const Constructor = () => {
    const priceCoefficient = 1;

    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState(null)
    const [modalTitle, setModalTitle] = useState('Default title')

    const [isDefaultMattressSize, setIsDefaultMattressSize] = useState(true)

    const [length, setLength] = useState(190)
    const [width, setWidth] = useState(80)
    const [diameter, setDiameter] = useState(0)

    const [mattressBase, setMattressBase] = useState(null)
    const [mattressCase, setMattressCase] = useState(null)
    const [selectedMattressLayers1, setSelectedMattressLayers1] = useState([])
    const [selectedMattressLayers2, setSelectedMattressLayers2] = useState([])

    const [isRectangular, setIsRectangular] = useState(false)
    const [isCircular, setIsCircular] = useState(false)
    const [isNotStandartForm, setIsNotStandartForm] = useState(false)

    const [aerators, setAerators] = useState(false)
    const [edgingTape, setEdgingTape] = useState(false)
    const [handles, setHanles] = useState(false)
    const [reinforcement, setReinforcement] = useState(false)

    const [mattressCases, setMattressCases] = useState([])
    const [mattressBases, setMattressBases] = useState([])
    const [mattressLayers, setMattressLayers] = useState([]);

    const loadData = async () => {
        axios.get(helpers.serverDomain + '/mattresses/cases').
        then(res => {
            setMattressCases(res.data);
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
    }

    useEffect(() => {
        loadData();
    }, [])

    const getTotalPrice = () => {
        let totalPrice = 0;

        selectedMattressLayers1.map(item => totalPrice += item.price);
        selectedMattressLayers2.map(item => totalPrice += item.price);

        totalPrice += mattressCase === null ? 0 : mattressCase.price;
        totalPrice += mattressBase === null ? 0 : mattressBase.price;

        totalPrice *= priceCoefficient;

        return totalPrice;
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
                    isCircular,
                    isRectangular,
                    isNotStandartForm,
                    length,
                    width,
                    diameter,
                    totalSum: getTotalPrice()
                }
                setModalTitle("Ваш заказ");
                setModalBody(<ConstructorOrderBody mattress={mattress}/>);
        }else{
            setModalTitle("Ошибка");
            setModalBody(<>Заполните все данные о матрасе</>);
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

    return(
        <div>
            <Head>
                <title>Mattex - Constructor</title>
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
            <Header/>

            <div className={styles.header}>
                <h1 className={styles.title}>Конструктор матраса</h1>

                <br/><br/>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className={styles.shadow} style={{ width: '35%'}}>
                        <h1 className={styles.subtitle}>Размеры (см):</h1>

                        <br/>

                        <div className={styles.sizeWrapper}>
                            <div className={styles.sizeSelectBody}>
                                <div className={styles.selectsWrapper}>
                                    <div className={styles.wrapperItem}>
                                        <div className={styles.wrapperItemTitle}>
                                            <div className={classnames(styles.rectangle, isRectangular && styles.rectanglePicked)} onClick={()=> {
                                                setIsDefaultMattressSize(false)
                                                setIsCircular(false)
                                                setIsNotStandartForm(false)
                                                setIsRectangular(!isRectangular)
                                            }}>

                                            </div> Прямоугольный
                                        </div>

                                        <select onChange={e => setWidth(e.target.value)} className={styles.select} disabled={!isRectangular}>
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
                                        <select onChange={e => setLength(e.target.value)} className={styles.select} disabled={!isRectangular}>
                                            <option value="190">190</option>
                                            <option value="195">195</option>
                                            <option value="200">200</option>
                                        </select>
                                        см.
                                    </div>
                                    <div className={styles.wrapperItem}>
                                        <div className={styles.wrapperItemTitle}>
                                            <div className={classnames(styles.circle, isCircular && styles.rectanglePicked)} onClick={()=> {
                                                setIsDefaultMattressSize(false)
                                                setIsRectangular(false)
                                                setIsNotStandartForm(false)
                                                setIsCircular(!isCircular)
                                            }}>
                                            </div>
                                            Круглый
                                        </div>
                                        <input type="number" className={styles.select} onChange={e => setDiameter(e.target.value)} placeholder={'Диаметр'} disabled={isCircular ? false : true}/>
                                        см.
                                    </div>
                                    <div className={styles.wrapperItem}>
                                        <div className={styles.wrapperItemTitle}>
                                            <div className={classnames(styles.notStabdartForm, isNotStandartForm && styles.rectanglePicked)} onClick={()=> {
                                                setIsDefaultMattressSize(false)
                                                setIsRectangular(false)
                                                setIsCircular(false)
                                                setIsNotStandartForm(!isNotStandartForm)
                                            }}>
                                            </div>
                                            Произвольной формы
                                        </div>
                                        <span className={styles.link} onClick={()=>{
                                            setIsDefaultMattressSize(false)
                                            setIsRectangular(false)
                                            setIsCircular(false)
                                            setIsNotStandartForm(!isNotStandartForm)
                                            setShowModal(true)
                                            setModalTitle('Вызов замерщика')
                                            setModalBody(<MeasurersCallBody/>)
                                        }}>Требуется выезд замерщика</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.shadow} style={{ width: '30%'}}>
                        <h1 className={styles.subtitle}>Выбор наполнителей:</h1>

                        <br/>

                        <div className={styles.sides}>
                            <div className={styles.downWrapper}>
                                <div className={styles.downWrapperItem}>
                                    <span className={styles.downWrapperTitle}>Чехол</span>
                                    <span className={styles.link} onClick={()=>{
                                        setShowModal(true)
                                        setModalTitle('Выбор чехла')
                                        setModalBody(<SelectMattressCaseBody cases={mattressCases} setMattressCase={setMattressCase} setShowModal={setShowModal}/>)
                                    }}>{mattressCase === null ? 'Выбрать чехол' : mattressCase.title}</span>
                                </div>

                                <br/>

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

                                <br/>

                                <div className={styles.downWrapperItem}>
                                    <span className={styles.downWrapperTitle}>Основание</span>
                                    <span className={styles.link} onClick={()=>{
                                        setShowModal(true)
                                        setModalTitle('Выбор основания')
                                        setModalBody(<SelectMattressBaseBody addTermovoilokLayer={addTermovoilokLayer} bases={mattressBases} setMattressBase={setMattressBase} setShowModal={setShowModal}/>)
                                    }}>{mattressBase === null ? 'Выбрать основание' : mattressBase.title}</span>
                                </div>

                                <br/>

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
                            </div>
                        </div>
                    </div>

                    <div className={styles.shadow} style={{ width: '20%'}}>
                        <h1 className={styles.subtitle}>Доп. опции:</h1>

                        <br/>

                        <div className={styles.checkboxes}>
                            <label htmlFor="aerators" style={{cursor: 'pointer'}} onClick={()=>setAerators(!aerators)}>
                                <input type="checkbox" id={'aerators'}/>
                                <span className={styles.checkboxTitle}>Аэраторы (система вентиляции)</span>
                            </label>
                            <label htmlFor="edgingTape">
                                <input type="checkbox" id={'edgingTape'} style={{cursor: 'pointer'}} onClick={()=>setEdgingTape(!edgingTape)}/>
                                <span className={styles.checkboxTitle}>Окантовачная лента</span>
                            </label>
                        </div>

                        <br/> <br/>

                        <div className={styles.checkboxes}>
                            <label htmlFor="handles">
                                <input type="checkbox" id={'handles'} style={{cursor: 'pointer'}} onClick={()=>setHanles(!handles)}/>
                                <span className={styles.checkboxTitle}>Ручки</span>
                            </label>
                            <label htmlFor="reinforcement">
                                <input type="checkbox" id={'reinforcement'} style={{cursor: 'pointer'}} onClick={()=>setReinforcement(!reinforcement)}/>
                                <span className={styles.checkboxTitle}>Армирование прессованным войлоком</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <br/>
                <h1 className={styles.title}>Итого: {getTotalPrice()} KZT</h1>
                <button
                    className={styles.button}
                    onClick={orderButtonPressed}
                >Перейти к оплате</button>
            </div>

            <div style={{marginTop: 70}}>
                <Footer/>
            </div>

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

export default Constructor;