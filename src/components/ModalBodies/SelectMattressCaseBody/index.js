import styles from './SelectMattressCaseBody.module.css'

const SelectMattressCaseBody = (props) => {

    return(
        <div className={styles.body}>
            <div className={styles.wrapper}>
                {
                    props.cases.map((item, idx) =>
                        <div className={styles.case} style={{backgroundImage: `url("${item.imgSrc}")`}} onClick={()=>{
                            props.setMattressCase(item)
                            props.setShowModal(false)
                        }}>
                            <span className={styles.caseName}>{item.title}</span>

                            <div className={styles.desc}>
                                {item.description}
                            </div>

                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default SelectMattressCaseBody;