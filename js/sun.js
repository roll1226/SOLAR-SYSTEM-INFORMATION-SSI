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
let sun = new planet('../images/sun.jpg', 50, 20, 20);
let material;
let geometry;
let sunMesh;
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

  material = sun.Material;

  geometry = sun.Geometry;
  sunMesh = new THREE.Mesh(geometry, material);
  scene.add(sunMesh);

  tick();

  function tick() {
    sunMesh.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
};

let sunText = new Vue({
  el: '#planetloadWrap',
  data: {
    sun: [{
      text: '<p class="text text1">太</p>'
    }, {
      text: '<p class="text text3">陽</p>'
    }]
  }
});

let maintitle = new Vue({
  el: '#maintitle',
  data: {
    maintitle: '<h1>太陽/SUN</h1>'
  }
});

planetVue.title1 = '<h2>太陽の特徴</h2>';
planetVue.title2 = '<h2>太陽の日食</h2>';
planetVue.title3 = '<h2>赤色巨星</h2>';

planetVue.text1 = '<p>太陽は自ら光を放出する巨大な恒星である。<img src="../images/suninfo.gif" alt="太陽情報">太陽系全体の質量の99.86%を占めている。膨大な占有率で他の惑星は太陽からのエネルギーを受け取り、影響をを受け、重力によって引くつけられている。<br>太陽の大気はほとんど水素である。太陽の中心は、1500万℃もの高温になっている。表面の温度は中心より低いが6000℃もある。</p>';

planetVue.text2 = '<p><img src="../images/purominens.jpg" alt="プロミネンス">太陽内部からのエネルギーの流れが磁場でとめられて、温度が下がった所が黒く見える。これを黒点といい、1609年にガリレオ・ガリレイによって発見された。太陽の表面のすぐ外側にある大気はという1万℃ある「彩層」がある。彩層から吹き上がるプロミネンスを観測することもできす。</p>';

planetVue.text3 = '<p><img src="../images/nisuoku.jpg" alt="日食">日食は月が太陽を覆って起こる。部分日食は、月が太陽の真上を通らないので、太陽が全て隠れず、三日月状になる日食のことである。金環日食は月から太陽が少しはみ出して細い指輪のように見える。</p>';
planetVue.text4 = '<p>皆既日食は太陽が月に丁度隠れる日食である。太陽にコロナが光って見れる。日本で見れる日食は2019年1月6日になる。</p>';

planetVue.text5 = '<p>星の中心部で、水素が燃えた後に出るヘリウムが溜まり星が膨張、大きくなる。その後、大きくなった分温度が下がり、赤く輝いき出す。これを赤色巨星という。<br>太陽は50億年水素を燃やし続けて、その後ガスを放出し、赤色巨星となる。</p>';
