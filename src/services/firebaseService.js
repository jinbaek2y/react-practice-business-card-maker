//here is db get - set (data fetching and setting location)
//instanse will be used index.js
import { ref, set, get, child, onValue } from "firebase/database";
import { database } from "../Config/firebase";

class FirebaseService {
  constructor() {
  }
  //useSubscribeValue ? specifed path's data changed, isolated state -> return snapshot.val()

  subscribeValue(path, callback) {
    onValue(ref(database, path), (snapshot) => {
      console.log("subscribeValue call, coz detected data change.....");
      console.log("subscribeValue snapshot", snapshot)
      if (snapshot.exists()) {
        callback(snapshot.val());
        console.log(`${path} changed data detected: ${snapshot.val()}`);
        console.log("changed data : ", snapshot.val());
      } else {
        console.log("No data available");
        callback(null);
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


}

export default FirebaseService;