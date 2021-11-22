import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
const Cards = ({ list, handleAdd, handleDelete, index }) => {
  console.log("cards, list: ", list);
  return (
    <>


      <div className={styles.container}>
        <h3>Card Maker</h3>
        {
          list?.map((data, key) => <Card handleClick={handleDelete} data={data} key={key} />)
        }
        {/* templete here, can i re-use ? templete <-> card comppnet */}
        {/* Card-re-use? props !== undefied case | === undefiend case <Card_Template /> */}
        <Card handleClick={handleAdd} index={index} />
      </div>

    </>
  )
}



export default Cards;