import React from 'react';
import styles from './Footer.module.css';
import { useEffect } from 'react';
const Footer = (props) => {
  console.log("Footer called");

  useEffect(() => {
    console.log("Footer unmounted... celan - up...");
  }, [])
  return (
    <div className={styles.container}>
      <h6>Code your dream</h6>
    </div>
  )
}


export default Footer;