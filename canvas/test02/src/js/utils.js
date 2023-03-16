module.exports = {
  adjustCanvas: (canvas) => {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (canvas.width != width) canvas.width = width;
    if (canvas.height != height) canvas.height = height;
    return [width, height];
  }
};

