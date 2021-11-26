import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ firebase }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    firebase.openSignInPopUp(navigate);
  }
  return (
    <div className={styles.container}>
      <img className={styles.testGif} src="/images/test.gif" alt="wait!" />
      <div className={styles.login}>
        <div className={styles.header}>
          <img className={styles.img} src={"/images/logo.png"} alt="wait" />
          <h1>
            Business Card Maker
          </h1>
        </div>
        <div className={styles.method}>
          <h3>Login</h3>
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