import React from 'react';
import styles from './Preview.module.css';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
const Preview = ({ data, loading, handleLoading, index, imgURL, targetInfo, handleRef }) => {
  const [loadingWithCard, setLoadingWithCard] = useState(false);
  const defaultURL = './images/default_logo.png';
  const imageURL = data.avatar_url ? data.avatar_url : `${defaultURL}`; //default URL
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  console.log("Preview -> containerRef style ", containerRef.style);
  console.log("imgURL: ", imgURL);

  // useEffect(() => {
  //   setTimeout(() => {
  //     containerRef.current.style.backgroundColor = 'skyblue';
  //   }, 2000)

  // }, [])

  useEffect(() => {
    if (targetInfo !== null && targetInfo.totalInfo.index === data.index) {
      console.log("in Preview, targetInfo: ", targetInfo);

      containerRef.current.style.backgroundColor = 'skyblue';

      setLoadingWithCard(true);
      // const handleLoad = () => {
      //   setTimeout(() => {

      //     targetInfo.loadingInfo.handleLodaing(false);
      //   }, 2000)
      // }
      const handleLoad = () => {
        console.log("Image onload!");
        setTimeout(() => {
          targetInfo.loadingInfo.handleLodaing(false);
          setLoadingWithCard(false);

        }, 0);
      }

      //   targetInfo.loadingInfo.handleLodaing(false);
      //   setLoadingWithCard(false);
      // }

      imgRef?.current?.addEventListener('load', handleLoad);
      return () => {
        console.log("img onload Cleand up called...");
        imgRef?.current?.removeEventListener('load', handleLoad);
      }
    }
  }, [imgURL])

  return (
    <div className={styles.container} ref={containerRef}>
      <img src={imageURL} alt="wait!" className={styles.img} ref={imgRef} />
      <div className={styles.text}>
        <div className={styles.title}>
          <span className={styles.name}>
            {loadingWithCard ? 'loading...' : `${data.name}`}
          </span>
          <span className={styles.company}>{data.company}</span>
        </div>

        <div className={styles.detail}>
          <span className={styles.task_title}>{data.title}</span>
          <span className={styles.email}>{data.email}</span>
          <span className={styles.message}>{data.message}</span>
        </div>
      </div>
    </div>

  )
}



export default Preview;