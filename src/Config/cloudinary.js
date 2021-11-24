
function insertCloundraySrc() {
  console.log("insertCloundraySrc, inserting widget js script....");
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://upload-widget.cloudinary.com/global/all.js";
  document.body.appendChild(script);
}
console.log("prepase work? befre");
console.log("prepase work? after");

export default insertCloundraySrc;

// setTimeout(() => {
//   console.log("useEffect, making widget...");
//   const myWidget = window.cloudinary?.createUploadWidget({
//     cloudName: process.env.REACT_APP_CLOUDNAME,
//     uploadPreset: process.env.REACT_APP_CLOUD_UPLOAD_PRESET,
//     // uploadPreset: 'ml_default',
//   }, (error, result) => {
//     if (!error && result && result.event === "success") {
//       console.log('Done! Here is the image info: ', result.info);
//       // here is url transforming... by using   result.info.public_id
//       // and then receive imgurl => setValue added image info { }
//       const pID = result.info.public_id;
//       const cld = new Cloudinary({
//         cloud: {
//           cloudName: process.env.REACT_APP_CLOUDNAME,
//         }
//       });
//       const myImage = cld.image(pID);
//       myImage.resize(thumbnail().width(300).height(300));
//       const myUrl = myImage.toURL();
//       console.log("myUrl: ", myUrl);
//       console.log("result: ", result);
//       setImgURL(myUrl);
//     }
//   }
//   );
//   console.log("window.cloudinary?.createUploadWidget: ", window.cloudinary?.createUploadWidget);
//   setWidget(myWidget);
// }, 500)
