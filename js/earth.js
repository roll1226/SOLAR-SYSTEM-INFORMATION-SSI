let loadingbg = document.getElementsByClassName('loadingbg');
setTimeout(function () {
  document.getElementById('loadingbg1').classList.add('loadingani1');
  document.getElementById('loadingbg2').classList.add('loadingani2');
  document.getElementById('loadingbg3').classList.add('loadingani3');
}, 700);
setTimeout(function () {
  document.getElementById('planetloadWrap').classList.add('none');
}, 1400);
setTimeout(function () {
  for (let i = 0; i < 3; i++) {
    loadingbg[i].classList.add('none');
  }
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
let width = document.getElementById('stage').clientWidth;
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

let earthText = new Vue({
  el: '#planetloadWrap',
  data: {
    earth: [{
      text: '<p class="text text1">地</p>'
    }, {
      text: '<p class="text text3">球</p>'
    }]
  }
});

let maintitle = new Vue({
  el: '#maintitle',
  data: {
    maintitle: '<h1>地球/EARTH</h1>'
  }
});

planetVue.title1 = '<h2>地球の特徴</h2>';
planetVue.title2 = '<h2>生命の誕生</h2>';
planetVue.title3 - '<h2>磁気圏</h2>';

planetVue.text1 = 'さんが生活している惑星。地球は約46億年前に誕生いたと考えられている。最初は宇宙のガスやちりが集まっただけで、大気はなかった。徐々に水ができて生命が生まれ、今の地球のように酸素ができた。地球の表面の7割は水がしめている。太陽系の惑星の中で生命が存在しているのは地球だけである。';

planetVue.text2 = '<p><img src="../images/life.jpg" alt="生命">最初の生命が誕生したのは約38億年前。地上には強い紫外線が降り注ぎ、火山活動は活発で、陸上は生物が生存するには厳しい環境だったため生命誕生の場は海の中でした。生物の材料となったのはアミノ酸、核酸塩基、糖などの有機物で、これらは原始大気中の二酸化炭素や窒素、水などの無機物に雷の放電、紫外線などのエネルギーが加えられて誕生した。</p>';

planetVue.text3 = '<p><img src="../images/magnetosphere.jpg" alt="磁気圏">地球の核は鉄やニッケルなどの合金でできており、内核が固体、外核が液体となっている。液体の外核のなかで内核が回転運動することによって電流が発生し、地球をひとつの大きな磁石にしていると考えられている。これはダイナモ作用と呼びますが、ダイナモの特徴として磁場の向きが時々反転している。地磁気の南北反転が少なくとも過去数億年にわたって続いてきたことが、地球の岩石に残された残留磁気の測定から分かっている。</p>';

planetVue.text4 = '<p><img src="../images/aurora.jpg" alt="オーロラ">この地磁気は地球を取り巻いて磁気圏を形成しており、地球の大気だけでは防ぎきれない、生物にとって有害な太陽風や宇宙線などをある程度防ぐバリアの役割を果たしている。また、磁気圏が強い太陽風を受けることで磁気嵐が発生し、地球の極地方でオーロラが見られる原因になっている。</p>';
