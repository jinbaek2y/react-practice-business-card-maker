import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import Card_Template from '../Card_Template/Card_Template';
const Cards = ({ list, handleAdd, handleDelete }) => {

  return (
    <>
      <div className={styles.container}>
        <h3>Card Maker</h3>
        {
          list?.map(val => <Card handleClick={handleDelete} data={'good'} />)
        }
        {/* templete here, can i re-use ? templete <-> card comppnet */}
        {/* Card-re-use? props !== undefied case | === undefiend case <Card_Template /> */}
        <Card handleClick={handleAdd} />
      </div>
    </>
  )
}



export default Cards;