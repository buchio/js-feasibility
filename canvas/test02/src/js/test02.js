const utils = require("./utils")

const log = (msg) => {
  const log = document.getElementById("log");
  log.textContent = `LOG: ${msg}2 \n${log.textContent}`
}

window.addEventListener("load", (e) => {
  console.log("window.load", e);
  const canvas = document.getElementById("canvas");
  canvas.addEventListener("click", () => {
    log('CLICK');
    console.log("CLICK");
    utils.toggleFullscreen(canvas);
  });
  // キー操作イベント登録
  canvas.setAttribute('tabindex', 0);
  canvas.addEventListener(
    "keydown",
    (event) => {
      console.log("KEY", event);
      if (event.key == "f") {
        utils.toggleFullscreen(canvas);
      }
    },
    false
  );


  
});

let currentDate = -1;
const anim = () => {

  const now = Date.now();
  if (now - currentDate > 100) {
    currentDate = now;
    
    const canvas = document.getElementById("canvas");
    let [width, height] = utils.adjustSize(canvas);

    const ctx = canvas.getContext("2d");
    const date = new Date();
    const sec = date.getSeconds() + date.getMilliseconds() / 1000;

    const fontSize = height / 2;
    ctx.font = `bold ${fontSize}px arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "red";
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width/2, height/2)
    ctx.rotate((sec * Math.PI) / 30);
    ctx.fillText("TEST02", 0, 0, width * 0.8);
    ctx.restore();
  }
  window.requestAnimationFrame(anim);
};

window.requestAnimationFrame(anim);
