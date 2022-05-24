import styles from './SelectMattressBaseBody.module.css'

const SelectMattressBaseBody = (props) => {
    return (
        <div className={styles.body}>
            <h1 className={styles.title}>
                Материалы представлены плитами фиксированной толщины.
                В матрасе может быть использован только один тип основания, или его может не быть вовсе.
                <br/> <br/>
                Основания:
            </h1>
            <div className={styles.list}>
                {props.bases.map(item =>
                    <div className={styles.listItem}>
                       <span className={styles.itemTitle}
                             onClick={()=> {
                                if(item.title.includes('пружин')){
                                    props.addTermovoilokLayer();
                                }
                                props.setMattressBase(item)
                                props.setShowModal(false)
                            }}> · {item.title}</span>         <br/>
                       <span className={styles.itemDesc}>{item.description}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SelectMattressBaseBody;