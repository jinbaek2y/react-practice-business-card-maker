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
  const [data, setData] = useState('');
  const [list, setList] = useState([]);
  const inputRef = useRef(null);
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const navigate = useNavigate();
  useEffect(() => {
    const path = 'test/test3/depth';
    firebase.subscribeValue(path, setData);
  }, []);

  const handleChange = (e) => {
    // console.log("value: ", e.target.value);
    // console.log("value: ", inputRef.current.value);
    const query = e.target.value
    const path = 'test/test3/depth';
    firebase.setValue(query, path);
    setData(query);
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

  const onAdd = () => {
    setList([...list, 1]);
  }

  const onDelete = () => {
    console.log("soon, will be updated delete function");
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.contents}>
          <Cards list={list} handleAdd={onAdd} handleDelete={onDelete} />
          <Previews list={list} />
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
