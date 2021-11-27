import React from 'react';
import styles from './LoadingSpiner.module.css';

const LoadingSpiner = (props) => (
  <div className={styles.spiner}>
    <i className="fas fa-circle-notch fa-2x"></i>
  </div>
);

export default LoadingSpiner;