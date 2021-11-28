import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useEffect } from 'react';
const Cards = ({ data, dataConfigs, setHandlers }) => {
  console.log("Cards ->  setHandlers", setHandlers)
  console.log("Cards -> dataConfigs", dataConfigs)
  console.log("Cards -> data", data)
  let list = data;

  console.log("Cards called");
  if (list !== null && !Array.isArray(list)) {
    list = Object.values(list);
  }
  console.log("Cards -> list", list);
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
          list?.map?.((cardInfo) => <Card {...{ cardInfo, dataConfigs, setHandlers }} />)
        }
        <Card {...{ dataConfigs, setHandlers }} />
      </div>

    </>
  )
}



export default Cards;