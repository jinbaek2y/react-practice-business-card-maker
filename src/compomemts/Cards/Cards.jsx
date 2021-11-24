import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
const Cards = ({ list, handleAdd, handleDelete, index, handleChange, widget, imgURL, handleImgURL, handleInfo, targetInfo, utility, imgDeleteToken, handleDeleteToken, loading, imgRefs }) => {
  console.log("cards, db list: ", list);
  //edge case, firebase error? [dat1, dat2, data3] in case,
  //delete data2 -> [data1, emty, data3 ]
  //dlelte data1 -> array is out, {2: data3} general object converted,
  //so => convert values on array
  if (list !== null && !Array.isArray(list)) {
    list = Object.values(list);
    console.log('list: ', list);
  }
  return (
    <>


      <div className={styles.container}>
        <h3>Card Maker</h3>
        {
          list?.map?.((data, mapIndex) => <Card handleClick={handleDelete} data={data} key={mapIndex} handleChange={handleChange} widget={widget} imgURL={imgURL} handleImgURL={handleImgURL} handleInfo={handleInfo} utility={utility} loading={loading} imgRef={imgRefs?.current?.[mapIndex]}
            mapIndex={mapIndex} imgRefs={imgRefs} />)
        }
        <Card handleClick={handleAdd} index={index} widget={widget} imgURL={imgURL} handleImgURL={handleImgURL} targetInfo={targetInfo} handleInfo={handleInfo} utility={utility} imgDeleteToken={imgDeleteToken} handleDeleteToken={handleDeleteToken} />
      </div>

    </>
  )
}



export default Cards;