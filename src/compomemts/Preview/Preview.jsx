import React from 'react';
import styles from './Preview.module.css';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { moveText } from '../../utility/loading';
const Preview = ({ data, index, imgURL, targetInfo, handleTaretInfo, handleImgURL }) => {
  const [loadingWithCard, setLoadingWithCard] = useState(false);
  const defaultURL = '/images/default_logo.png';
  const imageURL = data.avatar_url ? data.avatar_url : `${defaultURL}`; //default URL
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const companyRef = useRef(null);
  const titleRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const loadingRef = useRef(null);
  const intervalIdRef = useRef(null)

  useEffect(() => {
    console.log("in Preview, loading triiger UseEffect, imgURL: ", imgURL);
    if (imgURL === null) return;
    if (targetInfo !== null && targetInfo?.totalInfo?.index === data?.index) {
      const coppiedImgRef = imgRef?.current;
      console.log("in Preview useEfeect........");
      console.log("targetInfo: ", targetInfo);
      console.log("data: ", data);
      console.log("handleTaretInfo: ", handleTaretInfo);
      console.log("loadingRef?.current: ", loadingRef);
      setLoadingWithCard(true);
      setTimeout(() => {
        intervalIdRef.current = moveText('Loading...', loadingRef?.current);
      }, 0)


      const handleLoad = () => {
        console.log("Image onload!");
        setTimeout(() => {
          targetInfo.loadingInfo.handleLodaing(false);
          setLoadingWithCard(false);
          clearInterval(intervalIdRef.current);
          handleTaretInfo(null);
          handleImgURL(null);
        }, 0);
      }

      imgRef?.current?.addEventListener('load', handleLoad);

      return () => {
        console.log("img onload Cleand up called...");
        coppiedImgRef.removeEventListener('load', handleLoad);
      }

    }
    // targetInfo, data, handleTaretInfo, handleImgURL
  }, [imgURL])

  useEffect(() => {
    if (!loadingWithCard) {
      if (data.color !== '#ffffff') {
        // console.log("data.color not white! :");
        nameRef.current.style.color = 'white';
        companyRef.current.style.color = 'white';
        titleRef.current.style.color = 'white';
        emailRef.current.style.color = 'white';
        messageRef.current.style.color = 'white';
      } else {
        // console.log("data.color white! :");
        nameRef.current.style.color = 'black';
        companyRef.current.style.color = 'black';
        titleRef.current.style.color = 'black';
        emailRef.current.style.color = 'black';
        messageRef.current.style.color = 'black';
      }

      containerRef.current.style.backgroundColor = data.color;
    }

  }, [data, loadingWithCard])

  return (
    <div className={styles.container} ref={containerRef}>
      <img src={imageURL} alt="wait!" className={styles.img} ref={imgRef} />
      <div className={styles.text} ref={textRef}>
        {loadingWithCard ? <div className={styles.loading} ref={loadingRef}>
          Loading</div> : <>
            <div className={styles.title}>
              <span className={styles.name} ref={nameRef}>{data.name}
              </span>
              <span className={styles.company} ref={companyRef}>{data.company}</span>
            </div>

            <div className={styles.detail}>
              <span className={styles.task_title} ref={titleRef}>{data.title}</span>
              <span className={styles.email} ref={emailRef}>{data.email}</span>
              <span className={styles.message} ref={messageRef}>{data.message}</span>
            </div>
          </>
        }
      </div>
    </div>

  )
}



export default Preview;