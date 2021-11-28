import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useEffect } from 'react';
const Cards = ({ list, handleAdd, handleDelete, index, handleChange, imgURL, handleImgURL, handleInfo, targetInfo, utility, imgDeleteToken, handleDeleteToken }) => {
  console.log("Cards called");
  if (list !== null && !Array.isArray(list)) {
    list = Object.values(list);
  }

  useEffect(() => {

    return () => {
      console.log("Cards unmounted... celan - up...");
    }
  }, [])
  return (
    <>


      <div className={styles.container}>
        <h3>Card Maker</h3>
        {
          list?.map?.((data, mapIndex) => <Card handleClick={handleDelete} data={data} key={mapIndex} handleChange={handleChange} imgURL={imgURL} handleImgURL={handleImgURL} handleInfo={handleInfo} utility={utility} />)
        }
        <Card handleClick={handleAdd} index={index} imgURL={imgURL} handleImgURL={handleImgURL} targetInfo={targetInfo} handleInfo={handleInfo} utility={utility} imgDeleteToken={imgDeleteToken} handleDeleteToken={handleDeleteToken} />
      </div>

    </>
  )
}



export default Cards;