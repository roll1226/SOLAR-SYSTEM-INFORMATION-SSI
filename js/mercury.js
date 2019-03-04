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
let mercury = new planet('../images/mercury.jpg', 50, 20, 20);
let material;
let geometry;
let mercuryMesh;
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

  material = mercury.Material;

  geometry = mercury.Geometry;
  mercuryMesh = new THREE.Mesh(geometry, material);
  scene.add(mercuryMesh);

  tick();

  function tick() {
    mercuryMesh.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
};

let mercuryText = new Vue({
  el: '#planetloadWrap',
  data: {
    mercury: [{
      text: '<p class="text text1">水</p>'
    }, {
      text: '<p class="text text3">星</p>'
    }]
  }
});

let maintitle = new Vue({
  el: '#maintitle',
  data: {
    maintitle: '<h1>水星/MERCURY</h1>'
  }
});

planetVue.title1 = '<h2>水星の特徴</h2>';
planetVue.title2 = '<h2>水星の発見</h2>';
planetVue.title3 = '<h2>日本が水星調査</h2>';

planetVue.text1 = '<p>水星は太陽系でもっとも太陽に近くにある。<img src="../images/mercuryinfo.gif" alt="水星情報">大気はほとんどないので、表面の温度は昼間は450℃、夜中は-180℃まで下がる。岩石と金属から水星は出来ている。</p>';

planetVue.text2 = '<p><img src="../images/karurosu.jpg" alt="カルロス盆地">水星には大きなクレーターで出来ているカロリス盆地がある。カロリス盆地とは、クレーターのまわりを丸くかこんでいるカロリス山脈という波模様がついている場所のこと。</p>';

planetVue.text3 = '<p>水星はシュメール人の時代（紀元前3000年）から知られている。古い記録ではバビロニア人により観測されていて、古代ギリシャのヘラクレイトスは、水星と金星が地球ではなく、太陽のまわりをまわっていると考えていた。ギリシャで水星が5つの惑星の一つとわかったのはプラトンの時代からである。</p>';

planetVue.text4 = '<p>ギリシャでは、水星のことをヘルメスと言われている。ローマではメルクリウス、英語ではマーキュリーと呼ばれている。マーキュリーとは足が早いという意味で付けられた。<br>1639年にはイタリアのジョバンニ・ズッピが望遠鏡を使って水星を見て、水星にも金星や月と同じように、みちかけがあることを発見した。その結果、水星が太陽をまわっていることが証明された。</p>';

planetVue.text5 = '<p><img src="../images/bepicolombo.jpg" alt="ロケット">2018年10月20日、JAXAは国際水星探査計画BepiColombo（べピコロンボ）ミッションの水星表面探査機（MPO）及び水星磁気圏探査機「みお」（MMO）を搭載したアリアン5型ロケットを平成30年10月20日（土）22時45分28秒（現地時間）（10月20日（土）10時45分28秒（日本標準時））に、フランス領ギアナのギアナ宇宙センターから打ち上げられた。</p>';
