import React from 'react';
import Preview from '../Preview/Preview';
import styles from './Previews.module.css';

const Previews = ({ list, loading, handleLoading, imgURL, index, targetInfo, handleRef }) => {
  if (list !== null && !Array.isArray(list)) {
    list = Object.values(list);
    console.log('list: ', list);
  }
  return (
    <>


      <div className={styles.container}>
        <h3>Card Previews</h3>
        {
          list?.map?.((data, mapIndex) => <Preview data={data} handleLoading={handleLoading} imgURL={imgURL}
            loading={loading} key={mapIndex} index={index} targetInfo={targetInfo} handleRef={handleRef} />)
        }
      </div>

    </>
  )
}



export default Previews;