setTimeout(function () {
  $('.loadingbg1').addClass('loadingani1');
  $('.loadingbg2').addClass('loadingani2');
  $('.loadingbg3').addClass('loadingani3');
}, 900);
setTimeout(function () {
  $('.planetloadWrap').addClass('none');
}, 1600);
setTimeout(function () {
  $('.loadingbg').addClass('none');
}, 2400);


window.addEventListener('load', init);
let scene;
let camera;
let controls;
let uranus = new planet('../images/uranus.jpg', 33, 20, 20);
let hoop = new ring('../images/uranus-ring.jpg', 45, 10, 2, 1000);
let materialUranus;
let materialRing;
let geometryUranus;
let geometryRing;
let uranusMesh;
let ringMesh;
let renderer;
let light
let width = $('#stage').width();
let height = innerHeight;

function init() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#stage'),
  });
  renderer.setSize(width, height);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 200);
  controls = new THREE.OrbitControls(camera);
  controls.minDistance = 200;
  controls.maxDistance = 200;
  controls.enableDamping = true;
  controls.enableKeys = false;
  controls.enablePan = false;
  controls.dampingFactor = 0.6;

  light = new THREE.AmbientLight(0xFFFFFF, 2.0);
  scene.add(light);

  materialUranus = uranus.Material;

  materialRing = hoop.Material;

  geometryUranus = uranus.Geometry;
  geometryRing = hoop.Geometry;
  uranusMesh = new THREE.Mesh(geometryUranus, materialUranus);
  ringMesh = new THREE.Mesh(geometryRing, materialRing);
  scene.add(uranusMesh);
  scene.add(ringMesh);

  tick();

  function tick() {
    uranusMesh.rotation.y += 0.005;
    ringMesh.rotation.x = 1.5;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
};
