import styles from "./app";
import { useGoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom';

function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const navigate = useNavigate();

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
  console.log("App -> loaded", loaded)
  console.log("App -> signOut", signOut)

  const handleClick = () => {
    signOut();
  }

  return (
    <>
      <h1>hi2</h1>
      <button onClick={handleClick}>LogOut</button>
    </>
  );
}

export default App;
