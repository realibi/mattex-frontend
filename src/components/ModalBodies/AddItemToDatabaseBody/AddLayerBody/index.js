import {useState} from "react";
import axios from "axios";
import helpers from "../../../../helpers";

export default function AddLayerBody(){
    const [newLayerTitle, setNewLayerTitle] = useState('');
    const [newLayerDescription, setNewLayerDescription] = useState('');
    const [newLayerPrice, setNewLayerPrice] = useState(0);
    const [newLayerImgSrc, setNewLayerImgSrc] = useState('');
    const [newLayerThickness, setNewLayerThickness] = useState(0);

    const createLayer = () => {
        let data = {
            title: newLayerTitle,
            description: newLayerDescription,
            price: +newLayerPrice,
            imgSrc: newLayerImgSrc,
            thickness: newLayerThickness
        };

        axios.post(helpers.serverDomain + '/mattresses/layers', data)
            .then(function (response) {
                alert('Слой добавлен успешно!');
            })
            .catch(function (error) {
                alert('Что-то пошло нетак!');
            });
    }

    return(
        <div>
            <p>Название:</p>
            <input
                onChange={e => setNewLayerTitle(e.target.value)}
                value={newLayerTitle}
                type="text"
                style={{
                    width: '100%'
                }}
            />

            <p>Толщина:</p>
            <input
                onChange={e => setNewLayerThickness(e.target.value)}
                value={newLayerThickness}
                type="number"
                style={{
                    width: '100%'
                }}
            />

            <p>Описание:</p>
            <input
                type={'text'}
                onChange={e => setNewLayerDescription(e.target.value)}
                value={newLayerDescription}
                style={{
                    width: '100%'
                }}
            >
            </input>

            <p>Цена:</p>
            <input
                type="number"
                onChange={e => setNewLayerPrice(e.target.value)}
                value={newLayerPrice}
                style={{
                    width: '100%'
                }}
            />

            <p>Ссылка на изображение:</p>
            <input
                type={'text'}
                value={newLayerImgSrc}
                onChange={e => setNewLayerImgSrc(e.target.value)}
                style={{
                    width: '100%'
                }}
            >
            </input>

            <br/><br/>

            <button onClick={() => createLayer()}>Создать</button>
        </div>
    );
}