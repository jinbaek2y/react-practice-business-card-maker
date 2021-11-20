import React from 'react';
import styles from './login.module.css';
import { GoogleLogin, useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const navigate = useNavigate();

  const onLoginSuccess = (res) => {
    console.log("succes response: ", res);
    navigate('/app');
  }


  const onLoginFailure = (res) => {
    console.log("failrue response: ", res);
  }

  const { signIn, loaded } = useGoogleLogin({
    clientId,
    onSuccess: onLoginSuccess,
    onFailure: onLoginFailure,
    cookiePolicy: 'single_host_origin',
  })
  console.log("Login -> signIn", signIn)

  const handleClick = (e) => {
    signIn();
  }
  console.log("signIn: ", signIn);
  console.log("loaded: ", loaded);
  // http://localhost:3000/
  // 102192948215554739590
  // 102192948215554739590

  return (

    <div className={styles.container}>

      <div className={styles.login}>
        <div className={styles.header}>
          <img className={styles.img} src={"./images/logo.png"} />
          <h1 className={styles.text}>
            Business Card Maker
          </h1>
        </div>
        <div className={styles.method}>
          <h3>Login</h3>
          <div className={styles.btns}>
            <button onClick={handleClick}>Google</button>
            <button>Github</button>
          </div>
        </div>
        <div className={styles.footer}>
          <h5>Code your dream</h5>
        </div>
      </div>
    </div>
  )
};


export default Login;