import styles from './SelectMattressLayerBody.module.css'

const SelectMattressLayerBody = (props) => {
    return (
        <div className={styles.body}>
            <h1 className={styles.title}>
                Материалы представлены плитами фиксированной толщины.
                В матрасе может быть использован только один тип основания, или его может не быть вовсе.
                <br/> <br/>
                Наполнители:
            </h1>
            <div className={styles.list}>
                {props.layers.map(item =>
                    <div className={styles.listItem}>
                       <span className={styles.itemTitle} onClick={()=> {
                           if(props.currentLayerIndex !== undefined){
                               props.selectedLayers[props.currentLayerIndex] = item;
                           }else{
                               props.selectedLayers.push(item);
                           }
                           props.setShowModal(false);
                       }}> · {item.title} ({item.thickness} см.)</span>         <br/>
                       <span className={styles.itemDesc}>{item.description}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SelectMattressLayerBody;