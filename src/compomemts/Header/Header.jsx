import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ handleSignOut }) => {
  const navigate = useNavigate();
  const hadnleClick = () => {
    handleSignOut(navigate);
  }
  return (
    <>
      <div className={styles.container}>

        <div className={styles.header} >
          <img src={'/images/logo.png'} className={styles.img} alt="wait" />
          <h1>Business Card Maker</h1>
          <button className={styles.logout} onClick={hadnleClick}>Logout</button>
        </div>
      </div>
    </>
  )
}


export default Header;