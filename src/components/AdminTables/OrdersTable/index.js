import styles from "../SalesTable/style.module.css";
import classnames from 'classnames'
import React, {useState} from "react";
import axios from "axios";
import helpers from "../../../helpers";
import ModalWindow from "../../ModalWindow";
import OrderInfo from "./OrderInfo";

export default function OrdersTable(props){
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('Default body')
    const [modalTitle, setModalTitle] = useState('Default title')

    const deleteOrder = (id) => {
        axios.delete(helpers.serverDomain + '/orders/' + id)
            .then(function (response) {
                alert('Заказ удален успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    return(
        <>
            <div>
                <div style={{display: showModal ? 'block' : 'none'}}>
                    <ModalWindow body={modalBody} setShowModal={setShowModal} title={modalTitle}/>
                </div>
                <table className={styles.table} cellPadding={10}>
                    <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Телефон</th>
                        <th>Дата</th>
                        <th>Сумма</th>
                        {props.admin && (<th>Удалить</th>)}
                        {props.admin && (<th>Заказ</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {props.orders.map(item => (
                        <tr key={item.id} className={styles.table_row}>
                            <td className={styles.table_cell}>{item.user !== null ? item.user.fullName : 'Неизвестно'}</td>
                            <td className={styles.table_cell}>{item.user !== null ? item.user.phone : 'Неизвестно'}</td>
                            <td className={styles.table_cell}>{helpers.dateTimeFormatter(new Date(item.date))}</td>
                            <td className={styles.table_cell}>{item.totalSum}</td>
                            {props.admin && (<td className={styles.table_cell}><button onClick={() => deleteOrder(item._id)}>Удалить</button></td>)}
                            {props.admin && (<td className={styles.table_cell}>
                                <button
                                    onClick={() => {
                                        setShowModal(true);
                                        setModalBody(<OrderInfo order={item}/>)
                                    }}
                                >
                                Посмотреть
                            </button></td>)}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/>
            </div>
        </>
    );
}
