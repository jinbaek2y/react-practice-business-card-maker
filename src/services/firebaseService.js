//here is db get - set (data fetching and setting location)
//instanse will be used index.js
import { ref, set, onValue } from "firebase/database";
import { database } from "../Config/firebase";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
class FirebaseService {
  auth = {};
  //useSubscribeValue ? specifed path's data changed, isolated state -> return snapshot.val()

  subscribeValue(path, dataCallback) {
    onValue(ref(database, path), (snapshot) => {
      console.log("subscribeValue call, coz detected data change.....");
      console.log("subscribeValue snapshot", snapshot)
      if (snapshot.exists()) {
        dataCallback(snapshot.val());
        console.log(`${path} changed data detected: ${snapshot.val()}`);
        console.log("changed data : ", snapshot.val());
      } else {
        console.log("No data available");
        dataCallback(null);
      }
    }
    )
  }

  setValue(path, info) {
    console.log(`setValue called, path: ${path}, || info: ${info}`);
    console.log("setValue info: ", info);
    set(ref(database, path), info)
      .then((res) => {
        console.log("[setValue] data saved successfully, res: ", res);
      })
      .catch((error) => {
        console.log("[setValue] data svaed failled, coz: ", error);
      })
  }

  signOut(navigate) {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Sign-out successful. ")
      navigate('/');
    }).catch((error) => {
      // An error happened.
      console.log("sign-out -fail, coz: ", error);
    });
  }

  openSignInPopUp(navigate) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log("login success....");
        console.log("credential: ", credential);
        console.log("token: ", token);
        console.log("user: ", user);
        console.log("use uid: ", user.providerData[0].uid);
        console.log("user.email: ", user.email);
        navigate(`/app/${user.providerData[0].uid}`);
        //user.email => passing ?
        //user.providerData[0].uid or user.email apssing 
        // navigate => parameter passing ? 
        // url passing ?

        console.log("sig in ");
        // navigate('/app');
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("firebase google sign in error")
        console.log(`error deatail: ${errorCode} || ${errorMessage} || ${email} || ${credential} ||`);
      });
  }
}

export default FirebaseService;