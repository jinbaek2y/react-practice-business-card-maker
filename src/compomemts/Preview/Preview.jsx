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
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const companyRef = useRef(null);
  const titleRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  console.log("Preview -> containerRef style ", containerRef.style);
  console.log("imgURL: ", imgURL);

  useEffect(() => {
    if (data.color !== '#ffffff') {
      console.log("data.color not white! :");
      nameRef.current.style.color = 'white';
      companyRef.current.style.color = 'white';
      titleRef.current.style.color = 'white';
      emailRef.current.style.color = 'white';
      messageRef.current.style.color = 'white';
    } else {
      console.log("data.color white! :");
      nameRef.current.style.color = 'black';
      companyRef.current.style.color = 'black';
      titleRef.current.style.color = 'black';
      emailRef.current.style.color = 'black';
      messageRef.current.style.color = 'black';
    }

    containerRef.current.style.backgroundColor = data.color;

  }, [data])

  useEffect(() => {
    if (targetInfo !== null && targetInfo.totalInfo.index === data.index) {
      console.log("in Preview, targetInfo: ", targetInfo);

      setLoadingWithCard(true);

      const handleLoad = () => {
        console.log("Image onload!");
        setTimeout(() => {
          targetInfo.loadingInfo.handleLodaing(false);
          setLoadingWithCard(false);

        }, 0);
      }

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
      <div className={styles.text} ref={textRef}>
        <div className={styles.title}>
          <span className={styles.name} ref={nameRef}>
            {loadingWithCard ? 'loading...' : `${data.name}`}
          </span>
          <span className={styles.company} ref={companyRef}>{data.company}</span>
        </div>

        <div className={styles.detail}>
          <span className={styles.task_title} ref={titleRef}>{data.title}</span>
          <span className={styles.email} ref={emailRef}>{data.email}</span>
          <span className={styles.message} ref={messageRef}>{data.message}</span>
        </div>
      </div>
    </div>

  )
}



export default Preview;