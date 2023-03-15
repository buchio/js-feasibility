// import toggleFullscreen from "fullscreen.js"

export const log = (msg) => {
  const log = document.getElementById("log");
  log.textContent = `LOG: ${msg}2 \n${log.textContent}`
}

window.addEventListener("load", (e) => {
  console.log("window.load", e);
});


let currentDate = 0;
const anim = () => {

  const now = Date.now();
  if (now - currentDate < 100) {
    return;
  }

  const canvas = document.getElementById("canvas");
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  if (canvas.width != width) canvas.width = width;
  if (canvas.height != height) canvas.height = height;
  
  const ctx = canvas.getContext("2d");
  const date = new Date();
  const sec = date.getSeconds() + date.getMilliseconds() / 1000;

  const fontSize = height / 2;
  ctx.font = `bold ${fontSize}px arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width/2, height/2)
  ctx.rotate((sec * Math.PI) / 30);
  ctx.fillText("TEST02", 0, 0, width * 0.8);
  ctx.restore();

  window.requestAnimationFrame(anim);
};

window.requestAnimationFrame(anim);
