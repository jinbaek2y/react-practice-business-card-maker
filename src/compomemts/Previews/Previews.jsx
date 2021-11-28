import { React, useEffect } from 'react';
import Preview from '../Preview/Preview';
import styles from './Previews.module.css';

const Previews = ({ data, dataConfigs, setHandlers }) => {
  console.log("Previews called");
  if (data !== null && !Array.isArray(data)) {
    data = Object.values(data);
    console.log('data: ', data);
  }

  useEffect(() => {
    console.log("Previews unmounted... celan - up...");
  }, [])
  return (
    <>
      <div className={styles.container}>
        <h3>Card Previews</h3>
        {
          data?.map?.((cardInfo, mapIndex) => <Preview {...{ cardInfo, dataConfigs, setHandlers }} key={mapIndex} />)
        }
      </div>

    </>
  )
}



export default Previews;