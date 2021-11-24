import React from 'react';
import styles from './Card.module.css';
import { useRef, useEffect } from 'react';
import { useState } from 'react';
// import { myWidget } from '../../Config/cloudinary';

const Card = ({ handleClick, data, index, handleChange, widget, imgURL, handleImgURL, handleInfo, targetInfo, utility, imgDeleteToken, handleDeleteToken, imgRef, mapIndex, imgRefs }) => {
  const [loading, setLoading] = useState(false);
  const hasData = data !== undefined;
  const name = hasData ? data.name : 'image file';
  const buttonType = hasData ? 'Delete' : 'Add';
  const buttonClass = hasData ? `${styles.button} ${styles.hasData}` : `${styles.button}`;
  const nameRef = useRef(null);
  const colorRef = useRef(null);
  const companyRef = useRef(null);
  const emailRef = useRef(null);
  const titleRef = useRef(null);
  const messageRef = useRef(null);

  // const imgURL = null;

  const handleLodaing = (bool) => {
    setLoading(bool);
  }
  const handleImg = () => {
    console.log("in handleImg, widget exis? :", utility?.widget);

    if (data !== undefined && utility?.widget) {
      console.log("alreay exist thing, modifying....");
      const info = {
        totalInfo: {
          'index': data.index,
          'name': nameRef?.current?.value,
          'color': colorRef?.current?.value,
          'company': companyRef?.current?.value,
          'email': emailRef?.current?.value,
          'title': titleRef?.current?.value,
          'message': messageRef?.current?.value,
          'avatar_url': data.avatar_url ? data.avatar_url : null,
          'imgDeleteToken': data.imgDeleteToken ? data.imgDeleteToken : null,
        },
        loadingInfo: {
          handleLodaing,
        }
      }
      handleInfo(info);
      utility?.widget?.open();
      return;
    }

    console.log("not exist, first !");
    if (targetInfo !== null) {
      console.log("target info --> null");
      handleInfo(null);
    }
    utility?.widget?.open();
  }

  const onChange = () => {
    if (data === undefined) {
      return;
    }

    const info = {
      'index': data.index,
      'name': nameRef?.current?.value,
      'color': colorRef?.current?.value,
      'company': companyRef?.current?.value,
      'email': emailRef?.current?.value,
      'title': titleRef?.current?.value,
      'message': messageRef?.current?.value,
      'avatar_url': data.avatar_url ? data.avatar_url :
        null,
      'imgDeleteToken': data.imgDeleteToken ? data.imgDeleteToken : null,
    }

    handleChange?.(data.index, info);
  }
  const infoRest = () => {
    nameRef.current.value = null;
    colorRef.current.value = null;
    companyRef.current.value = null;
    emailRef.current.value = null;
    titleRef.current.value = null;
    messageRef.current.value = null;
  }

  const onClick = () => {
    // console.log("info: ", info);
    if (data === undefined) {
      // add method apply
      console.log("onClick => add method");
      const info = {
        'index': index,
        'name': nameRef?.current?.value,
        'color': colorRef?.current?.value,
        'company': companyRef?.current?.value,
        'email': emailRef?.current?.value,
        'title': titleRef?.current?.value,
        'message': messageRef?.current?.value,
        'avatar_url': imgURL,
        'imgDeleteToken': imgDeleteToken,
      }
      //
      handleClick(info);
      infoRest();
      handleImgURL(null);
      handleDeleteToken(null);
      return;
    }

    // data has => callback => delete method apply
    // here
    handleClick(data?.index, data?.imgDeleteToken);

  }

  return (
    <div className={styles.container}>
      <div className={styles.templete}>
        <div className={styles.firstRow}>
          <input className={styles.input} placeholder={'Name'} ref={nameRef} value={data?.name} onChange={onChange} />
          <input placeholder={'Company'} ref={companyRef}
            value={data?.company} onChange={onChange} />
          <input placeholder={'Light'} ref={colorRef}
            value={data?.color} onChange={onChange} />
        </div>
        <div className={styles.secondRow}>
          <input placeholder={'Title'} ref={titleRef}
            value={data?.title} onChange={onChange} />
          <input placeholder={'Email'} ref={emailRef}
            value={data?.email} onChange={onChange} />
        </div>
        <div className={styles.thirdRow}>
          <input placeholder={'Message'} ref={messageRef}
            value={data?.message} onChange={onChange} />
        </div>
        <div className={styles.buttons}>
          <button className={buttonClass} onClick={handleImg}>
            {loading ? 'loading..' : `${name}`
            }
          </button>
          <button className={styles.button} onClick={onClick}>{buttonType}</button>
        </div>
      </div>
    </div >
  )
}


export default Card;