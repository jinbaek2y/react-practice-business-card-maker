import { ref, set, onValue } from "firebase/database";
import { database } from "../Config/firebase";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
class FirebaseService {
  auth = {};

  getTimeStamp(setCallback) {
    const offsetRef = ref(database, ".info/serverTimeOffset");
    onValue(offsetRef, (snap) => {
      const offset = snap.val();
      const estimatedServerTimeMs = new Date().getTime() + offset;
      console.log("offsetRef: ", offsetRef);
      console.log("FirebaseService -> timeTest -> estimatedServerTimeMs", estimatedServerTimeMs);
      setCallback(estimatedServerTimeMs);
    }, {
      onlyOnce: true,
    });
  }

  subscribeValue(path, dataCallback) {
    onValue(ref(database, path), (snapshot) => {
      console.log("subscribeValue snapshot", snapshot)
      if (snapshot.exists()) {
        dataCallback(snapshot.val());
      } else {
        dataCallback(null);
      }
    }
    )
  }
  setValue(path, info) {
    console.log("in setValue called, info: ", info);
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
        // This gives you a Google Access Token. You can use it to access the Google ANum
        const user = result.user;
        navigate(`/app/${user.providerData[0].uid}`);
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