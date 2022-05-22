import { useState, useEffect} from "react";

import styles from "./CreateForm.module.scss"
import btn from "../../styles/button.module.scss";

import FormModal from './FormModal';

function CreateForm({onClickCreate, submitting, completed}) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
  if(completed) {
    setShowModal(true)
  } 
 
}, [completed])

useEffect(() => {
  if(!showModal) {
    setShowModal(false)
  }
}, [showModal])

  return <div className={styles.create}>
    <div className={styles.create__header}>
    <h3 className={styles.create__heading}>Fill in the required details appropiately</h3>
    </div>
    <div className={styles.create__formDiv}>
      <form className={styles.create__form} onSubmit={onClickCreate}>
        <input className={styles.create__formInput} required name="clubName" id="clubName" type="text" placeholder="Enter club name" />
        <input className={styles.create__formInput} required name="member" id="member" type="number" placeholder="Select max number of members" />
        <input className={styles.create__formInput} required name="stake" id="stake" min="20" max="100" type="number" placeholder="Min % to pass a move: min=20" />
        <textarea className={`${styles.create__formInput} ${styles.create__formDesc}`} required name="desc" id="desc" placeholder="Enter brief description" />
        {!submitting ? <button className={`${btn.btn} ${btn.btn__peach} ${styles.btn}`} type="submit" >Submit</button> : <p>Loading....</p>}
      </form>
    
    </div>
    <FormModal onClose={() => setShowModal(false)} showModal={showModal} />
</div>
}

export default CreateForm;
