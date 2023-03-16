const utils = require("./utils")
const fscreen = require("fscreen");
const interactjs = require("interactjs");

const log = (msg) => {
  const log = document.getElementById("log");
  log.textContent = `LOG: ${msg}2 \n${log.textContent}`
}

interactjs('#canvas').draggable({
  listeners: {
    move (event) {
      console.log('LOG', event.pageX, event.pageY);
      log(`X:${event.pageX}, Y:${event.pageY}`);
    },
  },
})

window.addEventListener("load", (e) => {
  console.log("window.load", e);
});


let currentDate = -1;
const anim = () => {

  const now = Date.now();
  console.log(currentDate);
  if (now - currentDate < 100) {
    window.requestAnimationFrame(anim);
    return;
  }
  currentDate = now;
  
  const canvas = document.getElementById("canvas");
  let [width, height] = utils.adjustCanvas(canvas);
  console.log(width, height);

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
