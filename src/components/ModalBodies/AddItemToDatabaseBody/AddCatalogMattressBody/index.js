import {useState} from "react";
import axios from "axios";
import helpers from "../../../../helpers";
import styles from "./style.module.css"

export default function AddCatalogMattressBody(){
    const [name, setName] = useState();
    const [cloth, setCloth] = useState();
    const [height, setHeight] = useState();
    const [load, setLoad] = useState();
    const [price, setPrice] = useState();
    const [imgFile, setImgFile] = useState('');
    const [rigidity, setRigidity] = useState('Жесткий');
    const [description, setDescription] = useState('');
    const [sizes, setSizes] = useState([]);
    const [newSizeWidth, setNewSizeWidth] = useState(0);
    const [newSizePrice, setNewSizePrice] = useState(0);

    const createCatalogMattressBody = () => {
        let formData = new FormData();
        formData.append('file', imgFile);

        axios({
            method: "post",
            url: `${helpers.serverDomain}/file/upload`,
            data: formData,
            headers: {"Content-Type": "multipart/form-data"},
        }).then((fileData) => {
            let data = {
                name,
                cloth,
                height,
                load,
                price,
                sizes,
                image: fileData.data,
                rigidity,
                description
            };

            console.log(data);

            axios.post(helpers.serverDomain + '/mattresses/catalogMattresses', data)
                .then(function (response) {
                    alert('Матрас добавлен успешно!');
                })
                .catch(function (error) {
                    alert('Что-то пошло нетак!');
                });
        })
    }

    return(
        <div>
            <div className={styles.container}>
                <p>Картинка</p>
                <input
                    type="file"
                    className={styles.inputFile}
                    onChange={function(e){
                        setImgFile(e.target.files[0]);
                    }}
                    style={{width: '100%'}}
                />

                <p>Название</p>
                <input className={styles.input} type="text" onChange={e => setName(e.target.value)} value={name} style={{width: '100%'}}/>

                <p>Ткань</p>
                <input className={styles.input} type="text" onChange={e => setCloth(e.target.value)} value={cloth} style={{width: '100%'}}/>

                <p>Высота(см)</p>
                <input className={styles.input} type="number" onChange={e => setHeight(e.target.value)} value={height}/>

                <p>Нагрузка(кг)</p>
                <input className={styles.input} type="number" onChange={e => setLoad(e.target.value)} value={load}/>

                <p>Жесткость</p>
                <select onChange={e => setRigidity(e.target.value)} value={rigidity}>
                    <option value="Жесткий">Жесткий</option>
                    <option value="Средне жесткий">Средне жесткий</option>
                    <option value="Мягкий">Мягкий</option>
                    <option value="Двусторонний (Жесткий-Средне жесткий)">Двусторонний (Жесткий-Средне жесткий)</option>
                    <option value="Двусторонний (Жесткий-Мягкий)">Двусторонний (Жесткий-Мягкий)</option>
                    <option value="Двусторонний (Средне жесткий-Мягкий)">Двусторонний (Средне жесткий-Мягкий)</option>
                </select>

                <p>Цена(KZT)</p>
                <input className={styles.input} type="number" onChange={e => setPrice(e.target.value)} value={price}/>

                <p>Описание</p>
                <textarea
                    className={styles.input}
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    rows={4}
                    style={{
                        marginBottom: 20
                    }}
                >

                </textarea>

                {
                    sizes.length !== 0 && sizes.map((item, index) => (
                        <div key={item.width}>
                            <div>
                                Ширина {item.width} стоит {item.price} KZT
                                <button
                                    onClick={() => {
                                        let copy = [...sizes];
                                        copy.splice(index, 1);
                                        setSizes(copy);
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className={styles.addSizeBlock}>
                <p className={styles.title}><b>Добавить размер</b></p>
                <div style={{display: 'flex'}}>
                    <div style={{width: '33%'}}>
                        <span>Ширина:</span>
                        <input
                            className={styles.input}
                            type="number"
                            value={newSizeWidth}
                            onChange={e => setNewSizeWidth(e.target.value)}
                        />
                    </div>
                    <div style={{width: '33%'}}>
                        <span>Цена:</span>
                        <input
                            className={styles.input}
                            type="number"
                            value={newSizePrice}
                            onChange={e => setNewSizePrice(e.target.value)}
                        />
                    </div>
                    <button
                        style={{width: '33%'}}
                        onClick={() => {
                            let newSize = {
                                width: Number(newSizeWidth),
                                price: newSizePrice
                            }

                            sizes.push(newSize);
                            setNewSizePrice(0);
                            setNewSizeWidth(0);
                        }}
                    >
                        Добавить
                    </button>
                </div>
            </div>

            <br/><br/>

            <button
                onClick={() => {
                    createCatalogMattressBody();
                }}
            >
                Создать
            </button>
        </div>
    );
}
