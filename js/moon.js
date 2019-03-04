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
let moon = new planet('../images/moon.jpg', 50, 20, 20);
let material;
let geometry;
let moonMesh;
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

  material = moon.Material;

  geometry = moon.Geometry;
  moonMesh = new THREE.Mesh(geometry, material);
  scene.add(moonMesh);

  tick();

  function tick() {
    moonMesh.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
};

let moonText = new Vue({
  el: '#planetloadWrap',
  data: {
    moon: [{
      text: '<p class="text text1">お</p>'
    }, {
      text: '<p class="text text2">月</p>'
    }, {
      text: '<p class="text text3">様</p>'
    }]
  }
});

let maintitle = new Vue({
  el: '#maintitle',
  data: {
    maintitle: '<h1>月/MOON</h1>'
  }
});

planetVue.title1 = '<h2>月の特徴</h2>';
planetVue.title2 = '<h2>月の誕生</h2>';
planetVue.title3 = '<h2>月探査計画「かぐや」</h2>';

planetVue.text1 = '<p><img src="../images/pattern.jpg" alt="模様">月は地球の衛星。このことから地球の兄弟星とも呼ばれている。空気や水はなく、昼と夜の温度差がはげしい。月は地球より小さいので、もちろん重力も小さく、地球の約6分の1になる。<br>月の模様でうさぎがオモチをついているように見えますが、世界中ではカニ、本を読む女性、ライオンなどにみ見えている。</p>';

planetVue.text2 = '<p>月の誕生には様々な説がある。原子惑星系円盤中の塵が集まりかたまって地球とともにできた「兄弟説」、地球の自転が現在よりも速かったころ、赤道部分がちぎれて飛び出した「親子説」、地球の近くにきた天体が、地球の引力につかまり月となった「他人説」、地球ができたころに、他の惑星が衝突し、惑星と地球の破片から月が生まれた「ジャイアントインパクト説（巨大衝突説）」など様々な仮説がある。現在はジャイアントインパクト説が有力である。</p>';

planetVue.text3 = '<p>日本が2007年9月に打ち上げた月周回衛星「かぐや」は、1960年代後半から70年代前半にかけてアメリカが行ったアポロ計画以来の、最大規模の月の探査計画である。この計画の主な目的は、月の起源と進化の解明のための科学データを取得することと、月周回軌道への投入や軌道姿勢制御技術の実証を行うこと。</p>';

planetVue.text4 = '<p><img src="../images/kaguya.jpg" alt="かぐや">「かぐや」は月のまわりを周回しながら15種類の装置を使って月を探査し、月表面の元素組成、鉱物組成、地形、表面付近の地下構造、磁気異常、重力場の観測を全域に行う。これらの観測によって、総合的に月の起源・進化の解明に迫ると期待されており、月の全球地図を作成したり高度データを取得したりしたほか、表と裏で重力場に違いがあることや地下構造に層状構造があること、月の裏側の一部では従来考えられていたよりも最近までマグマ活動があったことなどがわかった。</p>';
