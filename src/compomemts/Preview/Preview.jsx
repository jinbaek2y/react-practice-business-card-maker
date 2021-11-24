import React from 'react';
import styles from './Preview.module.css';
const Preview = ({ data }) => {
  const imgURL = data.avatar_url ? data.avatar_url : './images/default_logo.png';
  // console.log("Preview -> imgURL", imgURL)
  return (
    <div className={styles.container}>
      <img src={imgURL} alt="wait!" className={styles.img} />
      <div className={styles.text}>
        <div className={styles.title}>
          <span className={styles.name}>{data.name}</span>
          <span className={styles.company}>{data.company}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.task_title}>{data.title}</span>
          <span className={styles.email}>{data.email}</span>
          <span className={styles.message}>{data.message}</span>
        </div>
      </div>
    </div>

  )
}



export default Preview;