let points = [];
let cssText = '<style>@keyframes spring-anim {\n';

let dampingForce = 0.36;
let springForce = 0.1;

let velocity = 0;
let initVelocity = 0;
let position = 0;
let initPosition = -120;
let maxVelocity = 20;
let acceleration = 0;

let exitPoint = 0.1;
let reverse = false;

let quality = 1;

let rangeMin = 0;
let rangeMax = 0;

let numKeyFrames = 0;



let generateKeyframe = (i, pos, vel, acc) => {
  const percent = round(map(i, 0, points.length, 0, 100) * 100) / 100 + '%';
  pos = round(pos * 100) / 100;
  const keyframe = '{transform: translateX(' + pos + 'vw) skewX(' + constrain(-pos*3, -60, 60) + 'deg);}'
  return percent + ' ' + keyframe;
}


function updateGenerateKeyframe() {
  const input = document.getElementById('function').value;
  let script = 'generateKeyframe = (i, pos, vel, acc) => {' + input + '}';
  eval(script);
  renderSpringGraph();
}

function updateReverse(e) {
  reverse = e.target.checked;
  renderSpringGraph();
}


function setup() {
  document.getElementById('square').addEventListener('click', playAnimation);
  document.querySelector('.sliders').addEventListener('mouseup', playAnimation);
  document.getElementById('function').addEventListener('focusout', updateGenerateKeyframe);
  document.getElementById('reverse-toggle').addEventListener('input', updateReverse);
  const cnv = createCanvas(600, 300);
  cnv.parent('graph');
  cnv.class('shadow-outline');
  background('#3a4656');
  setWindow(-5, 100, -14, 23);
  renderSpringGraph();
}

function renderSpringGraph() {
  numKeyFrames = 0;
  points = [];
  rangeMax = 0, rangeMin = 0;
  velocity = initVelocity;
  position = initPosition;
  cssText = '<style>@keyframes spring-anim {\n';

  let iter = 0;
  while (iter < 1000) {
    const r = 6 * ystep;
    if (position > rangeMax) {
      rangeMax = position + r;
    } else if (position < rangeMin) {
      rangeMin = position - r;
    }
    points.push({p: position, v: velocity, a: acceleration});
    springEquation();
    iter ++;
    if (abs(velocity) <= exitPoint && abs(position) <= exitPoint && iter > 20) {
      break;
    }
  }
  setWindow(-5, iter, rangeMin, rangeMax);

  background('#3a4656');
  strokeWeight(1);
  stroke(255, 200);
  drawAxes();
  stroke(255, 30);
  drawGridlines(50, ymax-ymin < 100 ? 5 : 10);
  noFill();
  stroke('#2f75ff');
  strokeWeight(4);
  beginShape();
  const p1 = reverse ? worldToScreen(0, points[points.length - 1].p) : worldToScreen(0, points[0].p);
  vertex(p1.i, p1.j);
  for(let i = 0; i < points.length; i ++) {
    const j = reverse ? points.length - i - 1 : i;
    const p = worldToScreen(i, points[j].p);
    // stroke(255);
    // circle(p.i, p.j, 6);
    curveVertex(p.i, p.j);
    if (i % quality === 0) {
      cssText += generateKeyframe(i, points[j].p, points[j].v, points[j].a) + '\n';
      numKeyFrames ++;
    }
  }
  const p2 = reverse ? worldToScreen(xmax, points[0].p) : worldToScreen(xmax, points[points.length - 1].p);
  vertex(p2.i, p2.j);
  endShape();

  cssText += '}</style>';
  document.getElementById('frame-counter').innerText = numKeyFrames + ' frames';
  let output = cssText.replace('<style>', '').replace('</style>', '');
  output = output.substring(25, output.length-1);
  document.getElementById('output-text').innerText = output;
}

function playAnimation() {
  document.getElementById('animation').innerHTML = cssText;
  const square = document.getElementById('square');
  square.style = '';
  void square.offsetWidth;
  square.style = 'animation: spring-anim 1s linear;';
}

function copyText() {
  const output = cssText.replace('<style>', '').replace('</style>', '');
  navigator.clipboard.writeText(output);
}

function springEquation() {
  acceleration = (springForce * -position) - (dampingForce * velocity);
  velocity += acceleration;
  velocity = constrain(velocity, -maxVelocity, maxVelocity);
  position += velocity;
}