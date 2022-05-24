import MattressCard from "../MattressCard";
import React from "react";
import styles from './Catalog.module.css'

const CatalogBlock = ({mattresses=[], ...props}) => {
    return(
        <div className={styles.container}>
            <div className={styles.mainTitle}>
                Матрасы
            </div>
            <div className={styles.catalog}>
                {
                    mattresses.length===0 ? (
                        <div className={styles.title}>
                            Список пуст :(
                        </div>
                    ) : (
                        mattresses.map((mattress, index) => <MattressCard key={index} mattress={mattress} setShowModal={props.setShowModal} setModalBody={props.setModalBody} setModalTitle={props.setModalTitle}/>)
                    )
                }
            </div>
        </div>
    )
}

export default CatalogBlock;
