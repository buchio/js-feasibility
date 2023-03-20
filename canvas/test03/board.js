const FONT_SIZE=12;

let currentDate = -1;
function anim() {
  const textCanvas = document.getElementById('text');
  const maskCanvas = document.getElementById('mask');

  if ( textCanvas.width != Math.floor(FONT_SIZE * textCanvas.clientWidth / textCanvas.clientHeight) ||
       textCanvas.height != FONT_SIZE ) {
    textCanvas.width = Math.floor(FONT_SIZE * textCanvas.clientWidth / textCanvas.clientHeight);
    textCanvas.height = FONT_SIZE;
  }
  
  if ( maskCanvas.width != maskCanvas.clientWidth ||
       maskCanvas.height != maskCanvas.clientHeight ) {
    maskCanvas.width = maskCanvas.clientWidth;
    maskCanvas.height = maskCanvas.clientHeight;
  }
  
  const now = Date.now();
  if (now - currentDate > 10) {
    currentDate = now;
    {
      const ctx = textCanvas.getContext("2d");
      const w = textCanvas.width;
      const h = textCanvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.fillStyle = 'rgb(243, 152, 0)';
      ctx.font = `${h}px "MS 明朝"`;
      //const msg = `このCanvasの大きさは 幅:${w} 高さ:${h} です。`;
      const msg = `宇都宮駅での人身事故の影響で、湘南新宿ライン、東急東横線、相模線、みなとみらい線の各線は1時間から2時間の遅れとなっております。復旧の目処は立っておりません。`;
      const text = ctx.measureText(msg);

      ctx.textAlign = "left";
      const ty = (h - (text.fontBoundingBoxDescent - text.fontBoundingBoxAscent)) / 2;
      ctx.fillText(msg, -((now/110) % (text.width+w))+w, ty);
      ctx.restore();
    }
    
    {
      const ctx = maskCanvas.getContext("2d");
      const w = maskCanvas.width;
      const h = maskCanvas.height;
      const d = h / textCanvas.height;
      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.lineWidth = 1.2;;
      ctx.strokeStyle = "black";
      for (let x = 0; x < w; x+=d ) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y+=d ) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
  
  window.requestAnimationFrame(anim);
}
    
function onLoad() {
  const textCanvas = document.getElementById('text');
  const maskCanvas = document.getElementById('mask');
  textCanvas.width=FONT_SIZE * textCanvas.clientWidth / textCanvas.clientHeight;
  textCanvas.height=FONT_SIZE;
  maskCanvas.width = maskCanvas.clientWidth;
  maskCanvas.height = maskCanvas.clientHeight;
  anim();
}
    
