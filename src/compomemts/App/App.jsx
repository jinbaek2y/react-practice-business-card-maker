import styles from "./App.module.css";
import { useGoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Previews from "../Previews/Previews";
import Footer from "../Footer/Footer";
import { useCallback } from "react";

function App({ firebase, cloudnary }) {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(null);
  //widget -> useContext test do it
  const [widget, setWidget] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [imgDeleteToken, setImgDeleteToken] = useState(null);
  const [targetInfo, setTargetInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const handledInputRef = useRef(null);
  const imgRefs = useRef([]);
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const navigate = useNavigate();
  const userId = 'jinbaek@ny@google@login';
  const utility = cloudnary?.utility;
  console.log("in App, targetInfo: ", targetInfo);

  const handleRef = useCallback(
    (el) => {
      const hasAlreadyEl = imgRefs.current.indexOf(el);
      console.log("App -> hasAlreadyEl", hasAlreadyEl);
      if (el !== null && hasAlreadyEl === -1) {
        console.log("callbackRef called ! el: ", el);
        handledInputRef.current = el;
        imgRefs.current.push(el);
      }
    },
  );

  console.log("in app, handledInputRef: ", handledInputRef);
  console.log("in app, imgRefs: ", imgRefs);

  useEffect(() => {
    console.log("cloudnary.setCallbacks.length: ", cloudnary.getCallbacksLength());
    if (cloudnary.getCallbacksLength() < 2) {
      cloudnary.setCallback(setImgURL);
      cloudnary.setCallback(setImgDeleteToken);
      cloudnary.setCallback(setLoading);
    }
    console.log('cloudary setCalbaas, is change?:', cloudnary);
  }, []);

  useEffect(() => {
    const path = userId;
    firebase.subscribeValue(path, setData, setLoading);
  }, []);

  useEffect(() => {
    if (data?.length !== index) {
      console.log("index sync.....");
      setIndex(() => data?.length === undefined ? 0 : data.length);
    }
  }, [data])

  useEffect(() => {
    if (imgURL !== null) {
      if (targetInfo !== null) {

        targetInfo.loadingInfo.handleLodaing(true);
        const path = `${userId}/${targetInfo.totalInfo.index}`;
        targetInfo.totalInfo.avatar_url = imgURL;
        cloudnary.deleteByToken(targetInfo.totalInfo.imgDeleteToken);
        targetInfo.totalInfo.imgDeleteToken = imgDeleteToken;
        firebase.setValue(path, targetInfo.totalInfo);
        return;
      }
    }
  }, [imgURL]);

  const onChange = (targetIndex, info) => {
    const path = `${userId}/${targetIndex}`;
    firebase.setValue(path, info);
  }

  const onAdd = (info) => {
    // setTargetLoading(true);
    const path = `${userId}/${index}/`;
    firebase.setValue(path, info, setLoading);
    setIndex(index + 1);
  }
  // handleClick(data?.index, data?.imgDeleteToken);
  const onDelete = (targetIndex, imgDeleteToken) => {
    const path = `${userId}/${targetIndex}`;

    //here before db delete first of all posh fetch cloudinary delete
    //delete -> in useEffect ?
    // if (imgRef) {
    //   const targetIndex = imgRefs.current.indexOf(imgRef);
    //   if (targetIndex !== -1) {
    //     console.log("imgRef  will be targetIndex: ", targetIndex)
    //     imgRefs.current.splice(targetIndex, 1);
    //     console.log("imgRef removed, result: ", imgRefs.current);
    //   }
    // }
    if (imgDeleteToken) {

      cloudnary.deleteByToken(imgDeleteToken);
    }
    firebase.setValue(path, null);
  };

  const handleInfo = (info) => {
    setTargetInfo(info);
  }

  const onLogOutSuccess = (res) => {
    console.log("succes response: ", res);
    navigate('/');
  }

  const onLogOutFailure = (res) => {
    console.log("failrue response: ", res);
  }
  const handleDeleteToken = (value) => {
    setImgDeleteToken(value);
  }
  const { signOut, loaded } = useGoogleLogout({
    clientId,
    onLogoutSuccess: onLogOutSuccess,
    onFailure: onLogOutFailure,
    cookiePolicy: 'single_host_origin',
  })

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.contents}>
          <Cards list={data} handleAdd={onAdd} handleDelete={onDelete} index={index} handleChange={onChange} widget={widget} imgURL={imgURL} handleImgURL={setImgURL} handleInfo={handleInfo} targetInfo={targetInfo} utility={utility} imgDeleteToken={imgDeleteToken} handleDeleteToken={handleDeleteToken} />

          <Previews list={data} loading={loading} handleLoading={setLoading} imgURL={imgURL} index={index} targetInfo={targetInfo}
            handleRef={handleRef} />
        </div>
        <Footer />
      </div>
      {/* <button onClick={signOut}>LogOut</button> */}
      {/* <h1>realTime testing...</h1> */}
      {/* <input placeholder={data} ref={inputRef} onChange={handleChange} value={data} />
      <div>
        work same
      </div> */}
      {/* <input placeholder={data} onChange={handleChange} value={data} /> */}
      {/* </div> */}
    </>
  );
}

export default App;