import styles from "../SalesTable/style.module.css";
import classnames from 'classnames'
import {useState} from "react";
import axios from "axios";
import helpers from "../../../helpers";

export default function MattressCasesTable(props){
    const [newCaseTitle, setNewCaseTitle] = useState('');
    const [newCaseDescription, setNewCaseDescription] = useState('');
    const [newCasePrice, setNewCasePrice] = useState(0);
    const [newCaseImgSrc, setNewCaseImgSrc] = useState('');

    const createCase = () => {
        let data = {
            title: newCaseTitle,
            description: newCaseDescription,
            price: +newCasePrice,
            imgSrc: newCaseImgSrc
        };

        axios.post(helpers.serverDomain + '/mattresses/cases', data)
            .then(function (response) {
                alert('Чехол добавлен успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    const deleteCase = (id) => {
        axios.delete(helpers.serverDomain + '/mattresses/cases/' + id)
            .then(function (response) {
                alert('Чехол удален успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    return(
        <>
            <div>
                <table className={styles.table} cellPadding={10}>
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Описание</th>
                        <th>Цена</th>
                        <th>Ссылка на изображение</th>
                        {props.admin && (<th>Удалить</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {props.cases.map(item => (
                        <tr key={item.id} className={styles.table_row}>
                            <td className={styles.table_cell}>{item.title}</td>
                            <td className={classnames(styles.table_cell, styles.description)}>{item.description}</td>
                            <td className={styles.table_cell}>{item.price}</td>
                            <td className={styles.table_cell}><img width={'100%'} src={item.imgSrc}/></td>
                            {props.admin && (<td className={styles.table_cell}><button onClick={() => deleteCase(item._id)}>Удалить</button></td>)}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/>
            </div>
        </>
    );
}