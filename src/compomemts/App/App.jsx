import styles from "./App.module.css";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Previews from "../Previews/Previews";
import Footer from "../Footer/Footer";
import { createContext } from "react";

export const userContext = createContext();

function App({ firebase, cloudnary }) {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(null);
  //widget -> useContext test do it
  const [imgURL, setImgURL] = useState(null);
  const [imgDeleteToken, setImgDeleteToken] = useState(null);
  const [targetInfo, setTargetInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const utility = cloudnary?.utility;
  const userInfo = { userId: params?.userId };
  const userId = userInfo?.userId;

  useEffect(() => {
    // console.log("cloudnary.setCallbacks.length: ", cloudnary.getCallbacksLength());
    if (cloudnary.getCallbacksLength() < 2) {
      cloudnary.setCallback(setImgURL);
      cloudnary.setCallback(setImgDeleteToken);
    }
    // console.log('cloudary setCalbaas, is change?:', cloudnary);

    return () => {
      console.log("app unmounted... celan - up...");
    }
  }, [cloudnary]);

  useEffect(() => {
    const path = userId;
    firebase.subscribeValue(path, setData, setLoading);
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
        targetInfo.totalInfo.avatar_url = imgURL;
        cloudnary.deleteByToken(targetInfo.totalInfo.imgDeleteToken);
        targetInfo.totalInfo.imgDeleteToken = imgDeleteToken;
        firebase.setValue(path, targetInfo.totalInfo);
        //loading trrigere?
        // setImgURL(null);
        return;
      }
    }
  }, [imgURL, cloudnary, firebase, userId, targetInfo, imgDeleteToken]);

  const onChange = (targetIndex, info) => {
    const path = `${userId}/${targetIndex}`;
    firebase.setValue(path, info);
  }

  const onAdd = (info) => {
    // setTargetLoading(true);
    const path = `${userId}/${index}/`;
    firebase.setValue(path, info);
    setIndex(index + 1);
  }
  // handleClick(data?.index, data?.imgDeleteToken);
  const onDelete = (targetIndex, imgDeleteToken) => {
    const path = `${userId}/${targetIndex}`;

    if (imgDeleteToken) {
      console.log("in onDelete, imgDeleteToken: ", imgDeleteToken);
      cloudnary.deleteByToken(imgDeleteToken);
    }

    firebase.setValue(path, null);
  };

  const handleInfo = (info) => {
    setTargetInfo(info);
  }

  const handleDeleteToken = (value) => {
    setImgDeleteToken(value);
  }
  return (
    <>

      <div className={styles.container}>
        <userContext.Provider value={userInfo.userId}>
          <Header handleSignOut={firebase?.signOut} />
          <div className={styles.contents}>
            <Cards list={data} handleAdd={onAdd} handleDelete={onDelete} index={index} handleChange={onChange} imgURL={imgURL} handleImgURL={setImgURL} handleInfo={handleInfo} targetInfo={targetInfo} utility={utility} imgDeleteToken={imgDeleteToken} handleDeleteToken={handleDeleteToken} />

            <Previews list={data} loading={loading} handleLoading={setLoading} imgURL={imgURL} index={index} targetInfo={targetInfo} handleTaretInfo={setTargetInfo} handleImgURL={setImgURL}
            />
          </div>
          <Footer />
        </userContext.Provider>
      </div>
    </>
  );
}

export default App;