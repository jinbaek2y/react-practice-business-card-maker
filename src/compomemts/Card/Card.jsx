import React from 'react';
import styles from './Card.module.css';
const Card = ({ handleClick, data }) => {
  console.log("Card -> data", data)
  console.log("Card -> handleAdd", handleClick)

  //useMemo
  const hasData = data !== undefined;

  const name = hasData ? 'Name' : 'No file';
  const buttonType = hasData ? 'Delete' : 'Add';
  const buttonClass = hasData ? `${styles.button} ${styles.hasData}` : `${styles.button}`;

  return (
    <div className={styles.container}>
      <div className={styles.templete}>
        <div className={styles.firstRow}>
          <input className={styles.input} placeholder={'Name'} />
          <input placeholder={'Company'} />
          <input placeholder={'Light'} />
        </div>
        <div className={styles.secondRow}>
          <input placeholder={'Title'} />
          <input placeholder={'Email'} />
        </div>
        <div className={styles.thirdRow}>
          <input placeholder={'Message'} />
        </div>
        <div className={styles.buttons}>
          <button className={buttonClass}>{name}</button>
          <button className={styles.button} onClick={handleClick}>{buttonType}</button>
        </div>
      </div>
    </div>
  )
}


export default Card;