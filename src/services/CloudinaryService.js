import { makeWidget, insertCloundraySrc } from "../Config/cloudinary";
class CloudinaryService {
  callbacks = [];

  constructor() {
    this.utility = {};
    insertCloundraySrc(makeWidget, this.utility, this.callbacks);
  }

  getutility() {
    console.log("getutility called")
    console.log(this.utility);
    return this.utility;
  }

  setCallback(callback) {
    this.callbacks.push(callback);
  }
  getCallbacksLength() {
    return this.callbacks.length;
  }
  setutility(callback) {
    console.log("setutility called");
    callback(this.utility?.[0]);
  }

  async deleteByToken(token) {
    async function postData(url = '', data = {}) {
      try {
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response.json();
      } catch (e) {
        console.log("fetch error: ", e);
      }
    }

    postData(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/delete_by_token`, { token }).then(res => console.log("pos result: ", res));
  }
}

export default CloudinaryService;