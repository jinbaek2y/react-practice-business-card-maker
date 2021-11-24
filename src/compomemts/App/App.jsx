import styles from "./App.module.css";
import { useGoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Previews from "../Previews/Previews";
import Footer from "../Footer/Footer";

function App({ firebase, cloudnary }) {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(null);
  //widget -> useContext test do it
  const [widget, setWidget] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [imgDeleteToken, setImgDeleteToken] = useState(null);
  const [targetInfo, setTargetInfo] = useState(null);
  const inputRef = useRef(null);
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const navigate = useNavigate();
  const userId = 'jinbaek@ny@google@login';
  const utility = cloudnary?.utility;
  console.log("in App, targetInfo: ", targetInfo);
  console.log("imgDeleteToken: ", imgDeleteToken);
  console.log("targetInfo: ", targetInfo);
  // for (let f of cloudnary?.callbacks) {
  //   console.log("callbacks f: ", f);
  // }

  useEffect(() => {
    cloudnary.setCallback(setImgURL);
    cloudnary.setCallback(setImgDeleteToken);
    console.log('cloudary setCalbaas, is change?:', cloudnary);
  }, []);

  useEffect(() => {
    const path = userId;
    firebase.subscribeValue(path, setData);
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
        const path = `${userId}/${targetInfo.index}`;
        targetInfo.avatar_url = imgURL;
        cloudnary.deleteByToken(targetInfo.imgDeleteToken);
        targetInfo.imgDeleteToken = imgDeleteToken;
        firebase.setValue(path, targetInfo);
        return;
      }
    }
  }, [imgURL]);

  const onChange = (targetIndex, info) => {
    const path = `${userId}/${targetIndex}`;
    firebase.setValue(path, info);
  }

  const onAdd = (info) => {
    const path = `${userId}/${index}/`;
    firebase.setValue(path, info);
    setIndex(index + 1);
  }

  const onDelete = (targetIndex, imgDeleteToken) => {
    const path = `${userId}/${targetIndex}`;

    //here before db delete first of all posh fetch cloudinary delete
    //delete -> in useEffect ?
    cloudnary.deleteByToken(imgDeleteToken);
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
          <Previews list={data} />
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