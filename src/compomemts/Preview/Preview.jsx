import React from 'react';
import styles from './Preview.module.css';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { moveText } from '../../utility/loadingText';
const Preview = ({ cardInfo: data, dataConfigs, setHandlers }) => {
  console.log(`${data?.name} Preview called`);

  const [loadingWithCard, setLoadingWithCard] = useState(false);
  const [hasLoadingDone, setHasLoadingDone] = useState(true);
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
  const handleInterval = (id) => {
    console.log("handleInterval called... id: ", id);
    clearInterval(id);
  }

  useEffect(() => {
    console.log(`${data?.name} Preview no deps [] useEffect called`);
    return () => {
      console.log(`${data?.name} Preview no deps [] useEffect clean - up called`);
    }
  }, [data]);

  useEffect(() => {
    console.log(`${data.name} Preview, deps=[imgURL, handleTaretInfo, handleImgURL, data] called`);
    if (!hasLoadingDone) return;
    if (dataConfigs.imgURL === null) return;
    const coppiedImgRef = imgRef?.current;
    let handleLoad;
    if (dataConfigs.targetInfo !== null && dataConfigs.targetInfo?.totalInfo?.index === data?.index) {
      console.log("targetInfo?.totalInfo?.index === data?.index");
      setLoadingWithCard(true);
      // console.log("setLoadingWithCard called");
      setHasLoadingDone(false);
      // console.log("setHasLoadingDone called");
      console.log("loadingRef?.current: ", loadingRef?.current);
      // intervalIdRef.current = moveText('Loading...', loadingRef?.current);
      setTimeout(() => {
        intervalIdRef.current = moveText('Loading...', loadingRef?.current, 100);
      }, 0)
      // console.log("setTimeout called");
      handleLoad = () => {
        console.log("Image onload!");
        // setTimeout(() => {
        // console.log("handleLoad inside setTimout Callback called");
        dataConfigs.targetInfo.loadingInfo.handleLodaing(false);
        setLoadingWithCard(false);
        handleInterval(intervalIdRef.current);
        setHandlers.handleTaretInfo(null);
        setHandlers.handleImgURL(null);
        setHandlers.handleDeleteToken(null);
        setHasLoadingDone(true);
        coppiedImgRef.removeEventListener('load', handleLoad);
        // }, 10);
      }

      // console.log("imgRef.current: ", imgRef.current);
      //add event Listenr before add, alreay load ?
      console.log("imgRef?.current: ", imgRef?.current);
      imgRef?.current?.addEventListener('load', handleLoad);
    }

    return () => {
      console.log(`${data?.name} Preview  deps=[imgURL, handleTaretInfo, handleImgURL, data]  clean - up`);
    }
  }, [dataConfigs.imgURL, setHandlers.handleTaretInfo, setHandlers.handleImgURL, setHandlers.handleDeleteToken, dataConfigs.targetInfo, hasLoadingDone, data,
    setHandlers]);

  useEffect(() => {
    console.log(`${data.name} Preview, [data, loadingWithCard] called`);
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
    return () => {
      // console.log("initial color setting in Preview, clean - up called");
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