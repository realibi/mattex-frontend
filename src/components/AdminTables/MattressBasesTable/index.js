import styles from "../SalesTable/style.module.css";
import classnames from 'classnames'
import {useState} from "react";
import axios from "axios";
import helpers from "../../../helpers";

export default function MattressBasesTable(props){
    const [newBaseTitle, setNewBaseTitle] = useState('');
    const [newBaseDescription, setNewBaseDescription] = useState('');
    const [newBasePrice, setNewBasePrice] = useState(0);
    const [newBaseImgSrc, setNewBaseImgSrc] = useState('');

    const createBase = () => {
        let data = {
            title: newBaseTitle,
            description: newBaseDescription,
            price: +newBasePrice,
            imgSrc: newBaseImgSrc
        };

        axios.post(helpers.serverDomain + '/mattresses/bases', data)
            .then(function (response) {
                alert('Основа добавлен успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    const deleteBase = (id) => {
        axios.delete(helpers.serverDomain + '/mattresses/bases/' + id)
            .then(function (response) {
                alert('Основа удален успешно!');
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
                        <th className={styles.table_cell}>Описание</th>
                        <th className={styles.table_cell}>Цена</th>
                        <th className={styles.table_cell}>Ссылка на изображение</th>
                        {props.admin && (<th>Удалить</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {props.bases.map(item => (
                        <tr key={item.id} className={styles.table_row}>
                            <td className={styles.table_cell}>{item.title}</td>
                            <td className={classnames(styles.table_cell, styles.description)}>{item.description}</td>
                            <td className={styles.table_cell}>{item.price}</td>
                            <td className={styles.table_cell}><img width={'100%'} src={item.imgSrc}/></td>
                            {props.admin && (<td className={styles.table_cell}><button onClick={() => deleteBase(item._id)} className={styles.delete_btn}>Удалить</button></td>)}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/>
            </div>
        </>
    );
}
