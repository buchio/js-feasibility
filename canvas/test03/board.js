class Board {
  constructor(settings = {}) {
    this.settings = {
      FONT_SIZE: 16,
      FONT_COLOR: "#eb0",
      SCROLL_SPEED: 1,
      MASK_SIZE_RATIO: 8,
      MASK_LED_RADIUS_RATE: .4,
      RATE_MARGIN: 1.5,
      RATE_POSITION: .25,
    };
    for (let key in this.settings) {
      if (key in settings) {
        this.settings[key] = settings[key];
      }
    }
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

    const th = Math.round(this.settings.FONT_SIZE * this.settings.RATE_MARGIN);
    const tr = textCanvas.clientWidth / textCanvas.clientHeight;
    const tw = Math.round(th * tr);
    const mw = tw * this.settings.MASK_SIZE_RATIO;
    const mh = th * this.settings.MASK_SIZE_RATIO;

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
      textCtx.fillStyle = this.settings.FONT_COLOR;
      textCtx.fillText(this.message,
                       scrollPosition,
                       Math.round(th*this.settings.RATE_POSITION));
      
      if (this.scrollPosition == null) {
        console.log('Draw mask!');
        // Draw mask
        const maskCtx = maskCanvas.getContext("2d");
        const d = mh / textCanvas.height;
        const r = d*this.settings.MASK_LED_RADIUS_RATE;
        const a = Math.PI * 2;

        maskCtx.clearRect(0, 0, mw, mh);
        maskCtx.save();
        for (let x = 0; x < mw; x+=d ) {
          const ix = x+d/2;
          for (let y = 0; y < mh; y+=d ) {
            const iy = y+d/2;
            maskCtx.fillStyle = "#111f";
            maskCtx.fillRect(x, y, d, d);
            maskCtx.fillStyle = "#fff";
            maskCtx.globalCompositeOperation = "destination-out";
            maskCtx.beginPath();
            maskCtx.arc(ix, iy, r, 0, a, true);
            maskCtx.fill();
            maskCtx.fillStyle = "#0000";
            maskCtx.globalCompositeOperation = "source-over";
            maskCtx.beginPath();
            maskCtx.arc(ix, iy, r, 0, a, true);
            maskCtx.fill();
          }
        }
        maskCtx.restore();
      }
      this.scrollPosition = scrollPosition;
    }
    textCtx.restore();
  }
};

const board = new Board({
  FONT_SIZE: 16,
  SCROLL_SPEED: 2
});

const board2 = new Board({
  FONT_SIZE: 12,
  MASK_SIZE_RATIO: 10,
  FONT_COLOR: "#f0f",
  SCROLL_SPEED: 4
});

function init() {
  board.init(document.getElementById('text'),
             document.getElementById('mask'));
  board2.init(document.getElementById('text2'),
             document.getElementById('mask2'));
  board2.message = "メッセージを表示します。";
  anim();
}

const dateTimeFormat = new Intl.DateTimeFormat(
  'ja-JP-u-ca-japanese', {
    dateStyle: "full",
    timeStyle: "full"
  });

function anim() {

  const date = new Date();
  board.message = dateTimeFormat.format(date);
  board.anim();
  board2.anim();
  window.requestAnimationFrame(anim);
}

function onLoad() {
  init();
}
    
