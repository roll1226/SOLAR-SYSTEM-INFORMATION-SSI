let loadingbg = document.getElementsByClassName('loadingbg');
setTimeout(function () {
  document.getElementById('loadingbg1').classList.add('loadingani1');
  document.getElementById('loadingbg2').classList.add('loadingani2');
  document.getElementById('loadingbg3').classList.add('loadingani3');
}, 900);
setTimeout(function () {
  document.getElementById('planetloadWrap').classList.add('none');
}, 1600);
setTimeout(function () {
  for (let i = 0; i < 3; i++) {
    loadingbg[i].classList.add('none');
  }
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

let uranusText = new Vue({
  el: '#planetloadWrap',
  data: {
    uranus: [{
      text: '<p class="text text1">天</p>'
    }, {
      text: '<p class="text text2">王</p>'
    }, {
      text: '<p class="text text3">星</p>'
    }]
  }
});

let maintitle = new Vue({
  el: '#maintitle',
  data: {
    maintitle: '<h1>天王星/URANUS</h1>'
  }
});

planetVue.page1 = `<div class="title">
                     <h2>
                       天王星の特徴
                     </h2>
                   </div>
                   <div id="uranusimg1">
                     <p>
                       <img src="../images/planet/uranus.jpg" alt="天王星情報">はじめて望遠鏡をつかって観測された惑星。天王星は、ほかの惑星のなかで3番目に大きく、木星や土星と同じガス惑星である。成分の多くは水素、残りはヘリウムとメタンになっている。それから内部には、水とメタン、アンモニアの氷があって、中心には岩石の核があると言われている。メタンの雲が赤い光を吸収してしまうので、天王星は青く見えている。
                       <br>
                       天王星は公転軸に対して自転軸が98度も傾いている。過去に大きな天体が天王星に衝突し、その影響で自転軸が傾いてしまったのではないかとも考えられている。
                     </p>
                   </div>
                   <div class="clear"></div>

                   <div class="title">
                     <h2>
                       偶然発見された惑星
                     </h2>
                   </div>
                   <div>
                     <p>
                       天王星は1781年、イギリスの天文学者ウィリアム・ハーシェルによって発見された。彼が望遠鏡で全天の星を観測しているとき、ある星が他の恒星と違って円盤状に見えることに気づき、偶然、発見したのだ。
                     </p>
                   </div>`

planetVue.page2 = `<div>
                     <p>
                       彼は当初、それを彗星と考えていたようですが、その後の観測によって軌道が求まり、惑星であることがわかった。
                     </p>
                   </div>

                   <div class="title">
                     <h2>
                       星食の観測から発見された環
                     </h2>
                   </div>
                   <div id="uranusimg2">
                     <p>
                       <img src="../images/planet/uranusring.jpg" alt="天王星の環">天王星には11本の環が確認されている。そのどれもが細く非常に暗いため、普通の望遠鏡で直接観測することは困難。初めて環の存在が明らかになったのは1977年、天王星が背後の恒星を隠す「天王星による恒星食」が観測されたときのこと。このとき、天王星の本体が星を隠す前後にも、恒星の光が何かにさえぎられて減光する様子が観測された。その後の分析で、この減光が環によるものだと明らかになった。環を初めて直接観測したのは惑星探査機「ボイジャー2号」が天王星に接近したときのこと。現在では、地上の望遠鏡の大型化や宇宙望遠鏡の開発などによって、天王星の環が直接撮影できるようになった。
                     </p>
                   </div>
                   <div class="clear"></div>`
