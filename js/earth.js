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
let earth = new planet('../images/earth.jpg', 50, 20, 20);
let clowd = new crowd('../images/crowd.png', 51, 20, 20);
let materialEarth;
let materialCrowd;
let geometryEarth;
let geometryCrowd;
let earthMesh;
let crowdMesh;
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

  materialEarth = earth.Material;

  materialCrowd = clowd.Material;

  geometryEarth = earth.Geometry;
  geometryCrowd = clowd.Geometry;
  earthMesh = new THREE.Mesh(geometryEarth, materialEarth);
  crowdMesh = new THREE.Mesh(geometryCrowd, materialCrowd);
  scene.add(earthMesh);
  scene.add(crowdMesh);

  tick();

  function tick() {
    earthMesh.rotation.y += 0.005;
    crowdMesh.rotation.y += 0.003;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
};
