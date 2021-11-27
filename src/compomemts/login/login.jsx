import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { moveText } from '../../utility/loadingText';
import { useEffect } from 'react';

const Login = ({ firebase }) => {
  const loginTextRef = useRef(null);
  const navigate = useNavigate();
  const handleClick = () => {
    firebase.openSignInPopUp(navigate);
  }
  useEffect(() => {
    const loginTextIntervalId = moveText(loginTextRef.current.textContent, loginTextRef.current, 500);

    return () => {
      clearInterval(loginTextIntervalId);
    }
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.header}>
          <img className={styles.img} src={"/images/logo.png"} alt="wait" />
          <h1>
            Business Card Maker
          </h1>
        </div>
        <div className={styles.method}>
          <h3 className={styles.test} ref={loginTextRef}>Login</h3>
          <div className={styles.btns}>
            <button className={styles.button} onClick={handleClick}>Google</button>
            <button className={styles.button}>Github</button>
          </div>
        </div>
        <div className={styles.footer}>
          <h5>Code your dream</h5>
        </div>
      </div>
    </div >
  )
};


export default Login;