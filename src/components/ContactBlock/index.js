import styles from './ContactBlock.module.css'
import ContactFormBody from "../ModalBodies/ContactFormBody";

const ContactBlock = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.footer}>
                <span className={styles.title}>
                    ПОКУПАЙТЕ НАДЁЖНЫЕ И КАЧЕСТВЕННЫЕ
                    МАТРАСЫ У НАС
                </span>
            </div>
            <div className={styles.footer}>
                <span className={styles.text}>
                    Мы предлагаем вам удобные и комфортные матрасы
                    только из самых качественных материалов.
                </span>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={()=>{
                        props.setModalBody(<ContactFormBody setShowModal={props.setShowModal}/>)
                        props.setModalTitle('Оставить заявку')
                        props.setShowModal(true)
                    }}>Оставить заявку</button>
                </div>
            </div>
        </div>
    )
}

export default ContactBlock;