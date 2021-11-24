import React from 'react';
import Preview from '../Preview/Preview';
import styles from './Previews.module.css';

const Previews = ({ list, handleAdd, handleDelete }) => {
  if (list !== null && !Array.isArray(list)) {
    list = Object.values(list);
    console.log('list: ', list);
  }
  return (
    <>


      <div className={styles.container}>
        <h3>Card Previews</h3>
        {
          list?.map?.((data, index) => <Preview data={data} key={index} />)
        }
      </div>

    </>
  )
}



export default Previews;