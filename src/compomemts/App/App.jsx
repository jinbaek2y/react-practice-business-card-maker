import styles from "./App.module.css";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Previews from "../Previews/Previews";
import Footer from "../Footer/Footer";
import { createContext } from "react";
import { useCallback } from "react";

export const widgetContext = createContext();

function App({ firebase, cloudnary }) {
  console.log("App called");
  const [data, setData] = useState(null);
  console.log("App, data: ", data);
  const [index, setIndex] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [imgDeleteToken, setImgDeleteToken] = useState(null);
  const [targetInfo, setTargetInfo] = useState(null);
  const params = useParams();
  const utility = cloudnary?.utility;
  console.log("App -> utility", utility);
  const userInfo = { userId: params?.userId };
  const userId = userInfo?.userId;

  useEffect(() => {
    if (cloudnary.getCallbacksLength() < 2) {
      cloudnary.setCallback(setImgURL);
      cloudnary.setCallback(setImgDeleteToken);
    }

    return () => {
      console.log("App unmounted... celan - up...");
    }
  }, [cloudnary]);

  useEffect(() => {
    const path = userId;
    firebase.subscribeValue(path, setData);
  }, [firebase, userId]);

  useEffect(() => {
    if (data?.length !== index) {
      // console.log("index sync.....");
      setIndex(() => data?.length === undefined ? 0 : data.length);
    }
  }, [data, index])

  useEffect(() => {
    if (imgURL !== null) {
      if (targetInfo !== null) {
        console.log("img changing.......has imgDeleteToken? : ", imgDeleteToken);
        console.log("img changing...targetInfo: ", targetInfo);

        targetInfo.loadingInfo.handleLodaing(true);
        const path = `${userId}/${targetInfo.totalInfo.index}`;

        if (targetInfo.hasImgURLinDB) {
          cloudnary.deleteByToken(targetInfo.totalInfo.imgDeleteToken);
        } else {
          console.log("hasn ot imgURL in DB.../");
        }

        targetInfo.totalInfo.avatar_url = imgURL;
        targetInfo.totalInfo.imgDeleteToken = imgDeleteToken;
        console.log("path: ", path);
        console.group("imgURl, deleteToken well insert? :", targetInfo);
        firebase.setValue(path, targetInfo.totalInfo);
        return;
      }
    }
  }, [imgURL, cloudnary, firebase, userId, targetInfo, imgDeleteToken]);

  const handleChange = useCallback((targetIndex, info) => {
    const path = `${userId}/${targetIndex}`;
    firebase.setValue(path, info);
  }, [userId, firebase]);

  const handleAdd = useCallback((info) => {
    // setTargetLoading(true);
    const path = `${userId}/${index}/`;
    firebase.setValue(path, info);
    setIndex(index + 1);
  }, [firebase, userId, index]);
  const handleDelete = useCallback((targetIndex, imgDeleteToken) => {
    const path = `${userId}/${targetIndex}`;

    if (imgDeleteToken) {
      console.log("in handleDelete, imgDeleteToken: ", imgDeleteToken);
      cloudnary.deleteByToken(imgDeleteToken);
    }

    firebase.setValue(path, null);
  }, [userId, firebase, cloudnary])

  const handleInfo = useCallback((info) => {
    setTargetInfo(info);
  }, []);

  const handleDeleteToken = useCallback((value) => {
    setImgDeleteToken(value);
  }, []);

  const handleTaretInfo = useCallback((info) => {
    setTargetInfo(info);
  }, []);

  const handleImgURL = useCallback((url) => {
    setImgURL(url);
  }, []);

  const dataConfigs = {
    index,
    imgURL,
    targetInfo,
    imgDeleteToken,
  }

  const setHandlers = {
    handleAdd,
    handleDelete,
    handleChange,
    handleImgURL,
    handleTaretInfo,
    handleInfo,
    handleDeleteToken,
  }
  return (
    <>
      <widgetContext.Provider value={utility?.widget}>
        <div className={styles.container}>
          <Header handleSignOut={firebase?.signOut} />
          <div className={styles.contents}>
            <Cards {...{ data, dataConfigs, setHandlers }} />
            <Previews {...{ data, dataConfigs, setHandlers }} />
          </div>
          <Footer />
        </div>
      </widgetContext.Provider>
    </>
  );
}

export default App;