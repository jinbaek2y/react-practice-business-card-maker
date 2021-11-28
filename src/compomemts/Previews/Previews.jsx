import { React, useEffect } from 'react';
import Preview from '../Preview/Preview';
import styles from './Previews.module.css';

const Previews = ({ list, loading, handleLoading, imgURL, index, targetInfo, handleRef, handleTaretInfo, handleImgURL, handleDeleteToken }) => {
  console.log("Previews called");
  if (list !== null && !Array.isArray(list)) {
    list = Object.values(list);
    console.log('list: ', list);
  }
  useEffect(() => {
    console.log("Previews unmounted... celan - up...");
  }, [])
  return (
    <>


      <div className={styles.container}>
        <h3>Card Previews</h3>
        {
          list?.map?.((data, mapIndex) => <Preview data={data} handleLoading={handleLoading} imgURL={imgURL}
            loading={loading} key={mapIndex} index={index} targetInfo={targetInfo} handleTaretInfo={handleTaretInfo} handleImgURL={handleImgURL} handleDeleteToken={handleDeleteToken} />)
        }
      </div>

    </>
  )
}



export default Previews;