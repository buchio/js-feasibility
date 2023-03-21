class Board {
  constructor() {
    this.settings = {
      FONT_SIZE: 18,
      SCROLL_SPEED: 1,
      MASK_SIZE: 4,
      MARGIN_RATE: 1.5,
    };
    this.message = null;
  }

  init(textCanvas, maskCanvas) {
    this.textCanvas = textCanvas;
    this.maskCanvas = maskCanvas;
    this.scrollPosition = null;
  }
  
  anim() {
    if ( this.message == null ) {
      return;
    }
    const textCanvas = this.textCanvas;
    const maskCanvas = this.maskCanvas;

    const th = Math.round(this.settings.FONT_SIZE * this.settings.MARGIN_RATE);
    const tr = textCanvas.clientWidth / textCanvas.clientHeight;
    const tw = Math.round(th * tr);
    const mw = tw * this.settings.MASK_SIZE;
    const mh = th * this.settings.MASK_SIZE;

    if ( textCanvas.width != tw ||
         textCanvas.height != th ||
         maskCanvas.width != mw ||
         maskCanvas.height != mh ) {
      textCanvas.width = tw;
      textCanvas.height = th;
      maskCanvas.width = mw;
      maskCanvas.height = mh;
      this.scrollPosition = null;
    }
    const textCtx = textCanvas.getContext("2d");
    
    const now = Date.now();
    textCtx.save();
    textCtx.font = `${this.settings.FONT_SIZE}px "Lucida Console", Courier, monospace`;
    textCtx.textAlign = "left";
    textCtx.textBaseline = "top";
    const text = textCtx.measureText(this.message);
    const scrollWidth = text.width+tw;
    const speed = 1000 / this.settings.FONT_SIZE / this.settings.SCROLL_SPEED;
    const scrollPosition = Math.floor(-((now/speed) % scrollWidth)+tw);

    if (scrollPosition != this.scrollPosition) {

      // Draw text
      textCtx.clearRect(0, 0, tw, th);
      textCtx.fillStyle = 'rgb(243, 152, 0)';
      textCtx.fillText(this.message,
                       scrollPosition,
                       Math.round(th*(this.settings.MARGIN_RATE-1)/2));
      
      // Draw mask
      const maskCtx = maskCanvas.getContext("2d");
      const d = mh / textCanvas.height;
      maskCtx.clearRect(0, 0, mw, mh);

      maskCtx.save();
      maskCtx.lineWidth = 0.4;
      maskCtx.strokeStyle = "#333";
      for (let x = 0; x < mw; x+=d ) {
        maskCtx.beginPath();
        maskCtx.moveTo(x, 0);
        maskCtx.lineTo(x, mh);
        maskCtx.stroke();
      }
      for (let y = 0; y < mh; y+=d ) {
        maskCtx.beginPath();
        maskCtx.moveTo(0, y);
        maskCtx.lineTo(mw, y);
        maskCtx.stroke();
      }
      maskCtx.restore();
      this.scrollPosition = scrollPosition;
    }
    textCtx.restore();
  }
};

board = new Board();

function init() {
  board.init(document.getElementById('text'),
             document.getElementById('mask'));


  board.message = "次は渋谷　渋谷　お出口は左側です。東急東横線・東急田園都市線・京王井の頭線・地下鉄銀座線・地下鉄半蔵門線・地下鉄副都心線はお乗り換えです。電車とホームの間が開いているところがありますので足元にご注意ください The next station is しぶや. The doors on the left side will open. Please change here for the Tokyu Toyoko line, the Tokyu Den-entoshi line, the Keio Inokashira line, the Ginza subway line, the Hanzomon subway line, and the Fukutoshin subway line. Please watch your step when you leave the train. "
.padStart(2, '0')
  anim();
}
  
function anim() {

  const date = new Date();
  const sec = date.getSeconds().toFixed().padStart(2, '0');
  const min = date.getMinutes().toFixed().padStart(2, '0');
  const hour = date.getHours().toFixed().padStart(2, '0');
  board.message = `${hour}時 ${min}分 ${sec}秒`;

  
  board.anim();
  window.requestAnimationFrame(anim);
}

function onLoad() {
  init();
}
    
