import React from 'react';
import Preview from '../Preview/Preview';
import styles from './Previews.module.css';
const Previews = (props) => {
  return (
    <div className={styles.container}>
      <Preview />
    </div>

  )
}



export default Previews;