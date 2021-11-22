import styles from "./App.module.css";
import { useGoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Previews from "../Previews/Previews";
import Footer from "../Footer/Footer";

function App({ firebase }) {
  console.log("firebase paased :", firebase);
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(null);
  const [list, setList] = useState([]);
  const inputRef = useRef(null);
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const navigate = useNavigate();
  const userId = 'jinbaek@ny@google@login';
  useEffect(() => {
    const path = userId;
    firebase.subscribeValue(path, setData);
    setIndex(() => data?.length === undefined ? 0 : data.length);
  }, []);
  console.log("data?: ", data === undefined);
  console.log("data.lengh?: ", data?.length);
  console.log("index: ", index);

  const onAdd = (info) => {
    console.log("info befre: ", info);
    console.log("index: ", index);
    const path = `${userId}/${index}/`;
    console.log("info after: ", info);
    firebase.setValue(path, info);
    console.log("onAdd..data.length: ", data?.length);
    setIndex(index + 1);
    console.log("onAdd..after setindex, index : ", index);
  }

  setTimeout(() => {
    const path = `${userId}/1`;
    firebase.setValue(path, null);
  }, 2000)

  const handleChange = (e) => {
    // console.log("value: ", e.target.value);
    // console.log("value: ", inputRef.current.value);
    // const query = e.target.value
    // const path = 'test/test3/depth';
    // firebase.setValue(query, path);
    // setData(query);
  }


  const onLogOutSuccess = (res) => {
    console.log("succes response: ", res);
    navigate('/');
  }
  const onLogOutFailure = (res) => {
    console.log("failrue response: ", res);
  }

  const { signOut, loaded } = useGoogleLogout({
    clientId,
    onLogoutSuccess: onLogOutSuccess,
    onFailure: onLogOutFailure,
    cookiePolicy: 'single_host_origin',
  })


  const onDelete = () => {
    console.log("soon, will be updated delete function");
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.contents}>
          <Cards list={data} handleAdd={onAdd} handleDelete={onDelete} index={index} />
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
