
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

