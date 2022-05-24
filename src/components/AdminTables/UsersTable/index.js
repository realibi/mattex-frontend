import styles from "./style.module.css";
import axios from "axios";
import helpers from "../../../helpers";
import {useState} from "react";

export default function UsersTable(props){
    const deleteUsers = (id) => {
        axios.delete(helpers.serverDomain + '/users/' + id)
            .then(function (response) {
                alert('Пользователь удален успешно!');
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
                        <th>ФИО</th>
                        <th>Телефон</th>
                        <th>Логин</th>
                        <th>Пароль</th>
                        <th>Коэффициент</th>
                        {props.admin && (<th>Удалить</th>)}
                        {props.admin && (<th>Обновить</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {props.users.map(item => {
                        const [coefficient, setCoefficient] = useState(item.coefficient);

                        const updateUser = (id) => {
                            axios.put(helpers.serverDomain + '/users', {id, coefficient})
                                .then(function (response) {
                                    alert('Пользователь обновлен успешно!');
                                })
                                .catch(function (error) {
                                    alert('Что-то пошло нетак!');
                                });
                        }

                        return(
                            <tr key={item.id} className={styles.table_row}>
                                <td className={styles.table_cell}>{item.fullName}</td>
                                <td className={styles.table_cell}>{item.phone}</td>
                                <td className={styles.table_cell}>{item.login}</td>
                                <td className={styles.table_cell}>{item.password}</td>
                                <td className={styles.table_cell}><input type="number" onChange={e => setCoefficient(e.target.value)} value={coefficient}/></td>
                                {props.admin && (<td className={styles.table_cell}><button onClick={() => deleteUsers(item._id)}>Удалить</button></td>)}
                                {props.admin && (<td className={styles.table_cell}><button onClick={() => updateUser(item._id)}>Обновить</button></td>)}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <br/>
            </div>
        </>
    );
}