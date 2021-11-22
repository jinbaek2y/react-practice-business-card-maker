import React from 'react';
import styles from './Card.module.css';
import { useRef } from 'react';
const Card = ({ handleClick, data, index }) => {
  // console.log("Card -> data", data)
  //useMemo

  const hasData = data !== undefined;

  const name = hasData ? 'Name' : 'No file';
  const buttonType = hasData ? 'Delete' : 'Add';
  const buttonClass = hasData ? `${styles.button} ${styles.hasData}` : `${styles.button}`;

  const nameRef = useRef(null);
  const colorRef = useRef(null);
  const companyRef = useRef(null);
  const emailRef = useRef(null);
  const titleRef = useRef(null);
  const messageRef = useRef(null);



  const infoRest = () => {
    nameRef.current.value = null;
    colorRef.current.value = null;
    companyRef.current.value = null;
    emailRef.current.value = null;
    titleRef.current.value = null;
    messageRef.current.value = null;
  }

  const onClick = () => {
    // console.log("info: ", info);
    const info = {
      'index': index,
      'name': nameRef?.current?.value,
      'color': colorRef?.current?.value,
      'company': companyRef?.current?.value,
      'email': emailRef?.current?.value,
      'title': titleRef?.current?.value,
      'message': messageRef?.current?.value,
    }
    handleClick(info);
    infoRest();
  }

  return (
    <div className={styles.container}>
      <div className={styles.templete}>
        <div className={styles.firstRow}>
          <input className={styles.input} placeholder={'Name'} ref={nameRef} value={data?.name} />
          <input placeholder={'Company'} ref={companyRef}
            value={data?.company} />
          <input placeholder={'Light'} ref={colorRef}
            value={data?.color} />
        </div>
        <div className={styles.secondRow}>
          <input placeholder={'Title'} ref={titleRef}
            value={data?.title} />
          <input placeholder={'Email'} ref={emailRef}
            value={data?.email} />
        </div>
        <div className={styles.thirdRow}>
          <input placeholder={'Message'} ref={messageRef}
            value={data?.message} />
        </div>
        <div className={styles.buttons}>
          <button className={buttonClass}>{name}</button>
          <button className={styles.button} onClick={onClick}>{buttonType}</button>
        </div>
      </div>
    </div>
  )
}


export default Card;