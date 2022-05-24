import styles from './style.module.css'
import classnames from 'classnames'
import {useState} from "react";

export default function SalesTable(props){
    return(
        <div>
            <table className={styles.table} cellPadding={10}>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Ткань</th>
                        <th>Описание</th>
                        <th>Размер</th>
                        <th>Цена</th>
                        <th>Дата</th>
                        {/*{!props.admin && (<th>Возврат</th>)}*/}
                    </tr>
                </thead>
                <tbody>
                    {props.sales.map((item, index) => {
                        let name = item.catalogMattress !== undefined ? item.catalogMattress.name : 'Матрас собран в конструкторе';
                        let cloth = item.catalogMattress !== undefined ? item.catalogMattress.cloth: '–';
                        let description = '';

                        if(item.catalogMattress !== undefined){
                            description = item.description;
                        }else{
                            description += 'Основа: ' + item.mattress.base.title + '<br><br>';
                            description += 'Чехол: ' + item.mattress.case.title + '<br><br>';

                            description += 'Сторона 1:<br>';
                            for(let side of item.mattress.side1){
                                description += (side.title + '<br>');
                            }

                            description += '<br>';

                            description += 'Сторона 2:<br>';
                            for(let side of item.mattress.side2){
                                description += (side.title + '<br>');
                            }
                        }

                        return (
                            <tr key={index} className={styles.table_row}>
                                <td className={styles.table_cell}>{name}</td>
                                <td className={styles.table_cell}>{cloth}</td>
                                <td className={classnames(styles.table_cell, styles.description)} dangerouslySetInnerHTML={{__html: description}}></td>
                                <td className={styles.table_cell}>{item.size}</td>
                                <td className={styles.table_cell}>{item.totalSum} KZT</td>
                                <td className={styles.table_cell}>{item.date}</td>
                                {/*{!props.admin && (<td className={styles.table_cell}><button>Возврат</button></td>)}*/}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br/>
        </div>
    );
}
