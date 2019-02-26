setTimeout(function () {
  $('.loadingbg1').addClass('loadingani1');
  $('.loadingbg2').addClass('loadingani2');
  $('.loadingbg3').addClass('loadingani3');
}, 700);
setTimeout(function () {
  $('.planetloadWrap').addClass('none');
}, 1400);
setTimeout(function () {
  $('.loadingbg').addClass('none');
}, 2200);


window.addEventListener('load', init);
let scene;
let camera;
let controls;
let saturn = new planet('../images/saturn.jpg', 33, 20, 20);
let hoop = new ring('../images/saturn-ring.jpg', 50, 13, 2, 1000);
let materialSaturn;
let materialRing;
let geometrySaturn;
let geometryRing;
let saturnMesh;
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

  materialSaturn = saturn.Material;

  materialRing = hoop.Material;

  geometrySaturn = saturn.Geometry;
  geometryRing = hoop.Geometry;
  saturnMesh = new THREE.Mesh(geometrySaturn, materialSaturn);
  ringMesh = new THREE.Mesh(geometryRing, materialRing);
  scene.add(saturnMesh);
  scene.add(ringMesh);

  tick();

  function tick() {
    saturnMesh.rotation.y += 0.005;
    ringMesh.rotation.x = 1.5;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
};
