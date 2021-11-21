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
        console.log("cahnged Data: ", snapshot.val().userInput);
        // setData(snapshot.val().userInput);
        callback(snapshot.val().userInput)
      } else {
        console.log("No data available");
      }
    }
    )
  }

  setValue(query, path) {
    set(ref(database, path), {
      userInput: query,
    })
  }


}

export default FirebaseService;