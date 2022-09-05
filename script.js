let points = [];
let dampingForce = 0.1;
let springForce = 0.1;
let velocity = 0;
let initVelocity = 0;
let position = 10;
let initPosition = 10;
let rangeMin = 0;
let rangeMax = 0;


function setup() {
  const cnv = createCanvas(600, 300);
  cnv.parent('graph');
  background('#3a4656');
  setWindow(-5, 100, -14, 23);
  renderSpringGraph();
}

function renderSpringGraph() {
  points = [];
  rangeMax = 0, rangeMin = 0;
  velocity = initVelocity;
  position = initPosition;

  let iter = 0;
  while (iter < 1000) {
    const r = 6 * ystep;
    if (position > rangeMax) {
      rangeMax = position + r;
    } else if (position < rangeMin) {
      rangeMin = position - r;
    }
    points.push(position);
    springEquation();
    iter ++;
    if (abs(velocity) <= 0.01 && abs(position) <= 0.01 && iter > 20) {
      break;
    }
  }
  setWindow(-5, iter, rangeMin, rangeMax);

  background('#3a4656');
  stroke(255);
  drawAxes();
  stroke(255, 50);
  drawGridlines(50, 5);
  noFill();
  for(let i = 0; i < points.length; i ++) {
    const p = worldToScreen(i * (xmax-xmin)/points.length, points[i]);
    stroke(255);
    circle(p.i, p.j, 6);
    if (i > 0) {
      const pp = worldToScreen(((i-1)*(xmax-xmin)/points.length), points[i-1]);
      stroke(255, 100);
      line(p.i, p.j, pp.i, pp.j)
    }
  }
}

function springEquation() {
  velocity += (springForce * -position) - (dampingForce * velocity);
  position += velocity;
}