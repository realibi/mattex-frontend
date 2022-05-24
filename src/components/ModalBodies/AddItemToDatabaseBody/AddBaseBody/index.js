import {useState} from "react";
import axios from "axios";
import helpers from "../../../../helpers";

export default function AddBaseBody(){
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
                onChange={e => setNewBaseTitle(e.target.value)}
                value={newBaseTitle}
                type="text"
                style={{
                    width: '100%'
                }}
            />

            <p>Описание:</p>
            <input
                type={'text'}
                onChange={e => setNewBaseDescription(e.target.value)}
                value={newBaseDescription}
                style={{
                    width: '100%'
                }}
            >
            </input>

            <p>Цена:</p>
            <input
                type="number"
                onChange={e => setNewBasePrice(e.target.value)}
                value={newBasePrice}
                style={{
                    width: '100%'
                }}
            />

            <p>Ссылка на изображение:</p>
            <input
                type={'text'}
                value={newBaseImgSrc}
                onChange={e => setNewBaseImgSrc(e.target.value)}
                style={{
                    width: '100%'
                }}
            >
            </input>

            <br/><br/>

            <button onClick={() => createBase()}>Создать</button>
        </div>
    );
}