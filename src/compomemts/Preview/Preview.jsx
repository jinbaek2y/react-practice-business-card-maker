import React from 'react';
import styles from './Preview.module.css';
const Preview = (props) => {
  return (
    <div className={styles.container}>
      <img src={'./images/default_logo.png'} className={styles.img} />
      <div className={styles.text}>
        <div className={styles.title}>
          <span className={styles.name}>Name</span>
          <span className={styles.company}>company</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.task_title}>task_title</span>
          <span className={styles.email}>email</span>
          <span className={styles.message}>message somthing else talk to her</span>
        </div>
      </div>
    </div>

  )
}



export default Preview;