import {useState} from "react";
import axios from "axios";
import helpers from "../../../../helpers";

export default function AddCaseBody(){
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

    return(
        <div>
            <p>Название:</p>
            <input
                onChange={e => setNewCaseTitle(e.target.value)}
                value={newCaseTitle}
                type="text"
                style={{
                    width: '100%'
                }}
            />

            <p>Описание:</p>
            <input
                type={'text'}
                onChange={e => setNewCaseDescription(e.target.value)}
                value={newCaseDescription}
                style={{
                    width: '100%'
                }}
            >
            </input>

            <p>Цена:</p>
            <input
                type="number"
                onChange={e => setNewCasePrice(e.target.value)}
                value={newCasePrice}
                style={{
                    width: '100%'
                }}
            />

            <p>Ссылка на изображение:</p>
            <input
                type={'text'}
                value={newCaseImgSrc}
                onChange={e => setNewCaseImgSrc(e.target.value)}
                style={{
                    width: '100%'
                }}
            >
            </input>

            <br/><br/>

            <button onClick={() => createCase()}>Создать</button>
        </div>
    );
}