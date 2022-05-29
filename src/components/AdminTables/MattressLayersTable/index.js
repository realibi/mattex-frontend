import styles from "../SalesTable/style.module.css";
import classnames from 'classnames'
import {useState} from "react";
import axios from "axios";
import helpers from "../../../helpers";

export default function MattressLayersTable(props){
    const [newLayerTitle, setNewLayerTitle] = useState('');
    const [newLayerThickness, setNewLayerThickness] = useState(0);
    const [newLayerDescription, setNewLayerDescription] = useState('');
    const [newLayerPrice, setNewLayerPrice] = useState(0);
    const [newLayerImgSrc, setNewLayerImgSrc] = useState('');

    const createLayer = () => {
        let data = {
            title: newLayerTitle,
            description: newLayerDescription,
            thickness: newLayerThickness,
            price: +newLayerPrice,
            imgSrc: newLayerImgSrc
        };

        axios.post(helpers.serverDomain + '/mattresses/layers', data)
            .then(function (response) {
                alert('Слой добавлен успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    const deleteLayer = (id) => {
        axios.delete(helpers.serverDomain + '/mattresses/layers/' + id)
            .then(function (response) {
                alert('Слой удален успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    return(
        <>
            <div>
                <table className={styles.table} cellPadding={10}>
                    <thead className={styles.head_row}>
                    <tr>
                        <th className={styles.table_cell}>Наименование</th>
                        <th className={styles.table_cell}>Толщина</th>
                        <th className={styles.table_cell}>Описание</th>
                        <th className={styles.table_cell}>Цена</th>
                        <th className={styles.table_cell}>Ссылка на изображение</th>
                        {props.admin && (<th>Удалить</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {props.layers.map(item => (
                        <tr key={item.id} className={styles.table_row}>
                            <td className={styles.table_cell}>{item.title}</td>
                            <td className={classnames(styles.table_cell, styles.thickness)}>{item.thickness}</td>
                            <td className={classnames(styles.table_cell, styles.description)}>{item.description}</td>
                            <td className={styles.table_cell}>{item.price}</td>
                            <td className={styles.table_cell}><img width={'100%'} src={item.imgSrc}/></td>
                            {props.admin && (<td className={styles.table_cell}><button onClick={() => deleteLayer(item._id)} className={styles.delete_btn}>Удалить</button></td>)}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/>
            </div>
        </>
    );
}
