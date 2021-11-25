import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

export function makeWidget(storage, callbacks) {
  console.log("src onload,  making utility...");
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
      console.log("img done, callbacks: ", callbacks);
      callbacks?.[1](result.info.delete_token);
      callbacks?.[0](myUrl);
      // this.callbacks?.[2](false);
    }
  }
  );

  storage.widget = widget;
}

export function insertCloundraySrc(onLoad, ...arg) {
  console.log("insertCloundraySrc, inserting cloundary js script....");
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://upload-widget.cloudinary.com/1.45.44/global/all.js";
  document.head.appendChild(script);

  const handleLoad = () => {
    console.log("cloudnary load complete");
    console.log("onLoad: ", onLoad);
    onLoad?.apply(null, arg);
    script.removeEventListener('load', handleLoad);
  }
  script.addEventListener('load', handleLoad);
}
