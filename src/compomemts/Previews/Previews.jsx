import React from 'react';
import Preview from '../Preview/Preview';
import styles from './Previews.module.css';

const Previews = ({ list, handleAdd, handleDelete }) => {

  return (
    <>
      <div className={styles.container}>
        <h3>Card Previews</h3>
        {
          list?.map(val => <Preview data={'good'} />)
        }
      </div>
    </>
  )
}



export default Previews;