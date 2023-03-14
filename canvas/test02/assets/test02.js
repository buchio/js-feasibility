function log(msg) {
  const log = document.getElementById("log");
  log.textContent = `MSG2: ${msg}2 \n${log.textContent}`
}


uiEvent.

window.addEventListener("load", (e) => {
  console.log("window.load");
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

  fontSize = height / 2;
  ctx.font = `bold ${fontSize}px arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width/2, height/2)
  ctx.rotate((sec * Math.PI) / 30);
  ctx.fillText("ANIM", 0, 0, width * 0.8);
  ctx.restore();


  window.requestAnimationFrame(anim);
};

window.requestAnimationFrame(anim);
