import React from 'react'
import styles from "./FormModal.module.scss"
import Image from "next/image";
import box from "../../public/box.png";

function FormModal({showModal, onClose}) {
	if(!showModal){
		return null;
	}
  return (
  
	<div className={styles.modal} onClick={e => e.stopPropagation()}>
	  <div className={styles.modal__content}>
	  <span onClick={onClose} className={styles.modal__close}>&times;</span>
	  <Image src={box} alt="congractulations" />
	  <p className={styles.modal__text}>Congratulations your club have been successfully created</p>
		</div>
	  </div>

  )
}

export default FormModal;