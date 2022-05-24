import styles from './ModalWindow.module.css'
import {useState} from "react";

const ModalWindow = (props) => {
    const [body, setBody] = useState(props.body)
    const [title, setTitle] = useState(props.title)

    return(
        <div className={styles.body}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <span className={styles.title}>{props.title}</span>
                    <span className={styles.title} style={{cursor: 'pointer'}}
                          onClick={()=>{
                              props.setShowModal(false)
                          }}
                    >—</span>
                </div>
                <div className={styles.modalBody}>
                    {props.body}
                </div>
            </div>
        </div>
    )
}

export default ModalWindow;