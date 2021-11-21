import React from 'react';
import styles from './Header.module.css';
const Header = (props) => {

  return (
    <>
      <div className={styles.container}>

        <div className={styles.header} >

          <img src={'./images/logo.png'} className={styles.img} />
          <h1>Business Card Maker</h1>
          <button className={styles.logout}>Logout</button>
        </div>
      </div>
    </>
  )
}


export default Header;