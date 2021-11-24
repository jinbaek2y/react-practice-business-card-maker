import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

function insertCloundraySrc() {
  console.log("insertCloundraySrc, inserting cloundary js script....");
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://upload-widget.cloudinary.com/1.45.44/global/all.js";
  document.body.appendChild(script);
}

class CloudinaryService {
  callbacks = [];

  constructor() {
    this.utility = {};
    insertCloundraySrc();
    setTimeout(() => {
      console.log("useEffect, making utility...");
      console.log("cloudinary exis?: ", window.cloudinary);
      const widget = window.cloudinary?.createUploadWidget({
        cloudName: process.env.REACT_APP_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_CLOUD_UPLOAD_PRESET,
      }, (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
          const pID = result.info.public_id;
          const cld = new Cloudinary({
            cloud: {
              cloudName: process.env.REACT_APP_CLOUDNAME,
            }
          });
          const myImage = cld.image(pID);
          myImage.resize(thumbnail().width(300).height(300));
          const myUrl = myImage.toURL();
          console.log("myUrl: ", myUrl);
          console.log("result: ", result);
          console.log("img done, callbacks: ", this.callbacks);
          this.callbacks?.[1](result.info.delete_token);
          this.callbacks?.[0](myUrl);
        }
      }
      );

      this.utility.widget = widget;
    }, 500)
  }

  getutility() {
    console.log("getutility called")
    console.log(this.utility);
    return this.utility;
  }

  setCallback(callback) {
    this.callbacks.push(callback);
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