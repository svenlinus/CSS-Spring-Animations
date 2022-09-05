const springForceInput = document.getElementById('spring-force');

springForceInput.addEventListener('input', updateSpringForce);

function updateSpringForce(event) {
  springForce = Number(event.target.value);
  const val = document.getElementById('spring-value');
  val.innerText = springForce;
  renderSpringGraph();
}

const springDampInput = document.getElementById('spring-damp');

springDampInput.addEventListener('input', updateSpringDamp);

function updateSpringDamp(event) {
  dampingForce = Number(event.target.value);
  const val = document.getElementById('damp-value');
  val.innerText = dampingForce;
  renderSpringGraph();
}

const initVelocityInput = document.getElementById('init-velocity');

initVelocityInput.addEventListener('input', updateVelocity);

function updateVelocity(event) {
  initVelocity = Number(event.target.value);
  const val = document.getElementById('velocity-value');
  val.innerText = initVelocity;
  renderSpringGraph();
}

const initPositionInput = document.getElementById('init-position');

initPositionInput.addEventListener('input', updatePosition);

function updatePosition(event) {
  initPosition = Number(event.target.value);
  const val = document.getElementById('position-value');
  val.innerText = initPosition;
  renderSpringGraph();
}