import styles from './FilterBar.module.css'
import {useEffect, useState} from "react";
import classnames from 'classnames'
import axios from "axios";

const FilterBar = (props) => {
    const [showMobileFilter, setShowMobileFilter] = useState(false)

    const [rigidities, setRigidities] = useState([])
    const [loads, setLoads] = useState([]);

    function getMattresses(){
        props.setLoading(true)

        let mattresses = props.matresses;
        let filteredMattresses = mattresses.filter(item =>
            (rigidities.length === 0 ? true : rigidities.includes(item.rigidity))
            && (loads.length === 0 ? true : loads.includes(item.load))
        );

        props.setLoading(false);
        props.setMattresses(filteredMattresses);
    }

    function loadsChanged(newValue, e){
        let loadsArray = loads;
        if(e.target.checked){
            loadsArray.push(newValue);
        }else{
            loadsArray.splice(loadsArray.findIndex(item => item === newValue),1)
        }
        setLoads(loadsArray);
        getMattresses();
    }

    function rigidityChanged(newValue, e){
        let rigiditiesArray = rigidities;
        if(e.target.checked){
            rigiditiesArray.push(newValue);
        }else{
            rigiditiesArray.splice(rigiditiesArray.findIndex(item => item === newValue),1)
        }
        setRigidities(rigiditiesArray);
        getMattresses();
    }

    useEffect(()=>{

    }, [])

    return(
        <div className={styles.container}>
            <button onClick={()=>{
                setShowMobileFilter(!showMobileFilter)
            }} className={styles.filterButton}>{showMobileFilter ? 'Скрыть' : 'Показать'} фильтры</button>
            <div className={classnames(styles.desktop, showMobileFilter && styles.show)}>
                <div className={styles.mainTitle}>
                    Параметры
                </div>
                <div className={styles.criteries}>
                    <div className={styles.criteria}>
                        <span className={styles.criteriaTitle}>Жесткость</span>
                        <div className={styles.params}>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    rigidityChanged('Жесткий', e);
                                }}/> Жесткий
                            </label>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    rigidityChanged('Средне жесткий', e);
                                }}/> Средне жесткий
                            </label>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    rigidityChanged('Мягкий', e);
                                }}/> Мягкий
                            </label>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    rigidityChanged('Двусторонний (Жесткий-Средне жесткий)', e);
                                }}/> Двусторонний (Жесткий-Средне жесткий)
                            </label>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    rigidityChanged('Двусторонний (Жесткий-Мягкий)', e);
                                }}/> Двусторонний (Жесткий-Мягкий)
                            </label>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    rigidityChanged('Двусторонний (Средне жесткий-Мягкий)', e);
                                }}/> Двусторонний (Средне жесткий-Мягкий)
                            </label>
                        </div>
                    </div>
                    <div className={styles.criteria}>
                        <span className={styles.criteriaTitle}>Нагрузка до</span>
                        <div className={styles.params}>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    loadsChanged(90, e);
                                }}/> 90кг
                            </label>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    loadsChanged(123, e);
                                }}/> 123
                            </label>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    loadsChanged(50, e);
                                }}/> 50
                            </label>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    loadsChanged(120, e);
                                }}/> 120кг
                            </label>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    loadsChanged(140, e)
                                }}/> 140кг
                            </label>
                            <label className={styles.param}>
                                <input type="checkbox" onChange={(e)=>{
                                    loadsChanged(150, e);
                                }}/> 150кг
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBar;
