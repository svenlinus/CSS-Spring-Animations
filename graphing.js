
// window dimensions control
let xmax, xmin, xstep, ymax, ymin, ystep;

function setWindow(x_min, x_max, y_min, y_max) {
    xmin = x_min, xmax = x_max, xstep = (xmax-xmin) / width;
    ymin = y_min, ymax = y_max, ystep = (ymax-ymin) / height;
}

// initialize graphing space (to be called in setup)
function drawAxes() {
  const yax1 = worldToScreen(0, ymin), yax2 = worldToScreen(0, ymax);  // top bottom
  line(yax1.i, yax1.j, yax2.i, yax2.j);
  const xax1 = worldToScreen(xmin, 0), xax2 = worldToScreen(xmax, 0);
  line(xax1.i, xax1.j, xax2.i, xax2.j);
}

function drawGridlines(nx, ny) {
  const origin = worldToScreen(0, 0);
  for(let i = 0; i <= ymax + 3*ny; i += ny) {
      line(0, origin.j + i/ystep, width, origin.j + i/ystep);
  }
  for(let i = 0; i >= ymin - 3*ny; i -= ny) {
      line(0, origin.j + i/ystep, width, origin.j + i/ystep);
  }
  for(let i = 0; i <= xmax + 3*ny; i += nx) {
    line(origin.i + i/xstep, 0, origin.i + i/xstep, height);
  }
  for(let i = 0; i >= xmin - 3*nx; i -= nx) {
    line(origin.i + i/xstep, 0, origin.i + i/xstep, height);
  }
}

// world/screen coordinate conversions
function screenToWorld(i, j) {
  return {x: xmin + i * xstep, y: ymax - j * ystep};
}

function worldToScreen(x, y) {
  return {i: (x - xmin) / xstep, j: (y - ymax) / -ystep};
}