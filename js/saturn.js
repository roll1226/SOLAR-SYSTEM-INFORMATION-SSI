// ページ遷移
let loadingbg = document.getElementsByClassName("loadingbg");
setTimeout(function () {
  document.getElementById("loadingbg1").classList.add("loadingani1");
  document.getElementById("loadingbg2").classList.add("loadingani2");
  document.getElementById("loadingbg3").classList.add("loadingani3");
}, 700);
setTimeout(function () {
  document.getElementById("planetloadWrap").classList.add("none");
}, 1400);
setTimeout(function () {
  for (let i = 0; i < 3; i++) {
    loadingbg[i].classList.add("none");
  }
}, 2200);

// メッシュ作成
window.addEventListener("load", init);
let scene;
let camera;
let controls;
let saturn = new planet("../images/saturn.jpg", 33, 20, 20);
let hoop = new ring("../images/saturn-ring.jpg", 50, 13, 2, 1000);
let materialSaturn;
let materialRing;
let geometrySaturn;
let geometryRing;
let saturnMesh;
let ringMesh;
let renderer;
let light;
let width = document.getElementById("stage").clientWidth;
let height = innerHeight;

function init() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#stage")
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

  light = new THREE.AmbientLight(0xffffff, 2.0);
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

let saturnText = new Vue({ // 惑星名
  el: '#planetloadWrap',
  data: {
    saturn: [{
      text: '<p class="text text1">土</p>'
    }, {
      text: '<p class="text text3">星</p>'
    }]
  }
});

let maintitle = new Vue({ // タイトル
  el: '#maintitle',
  data: {
    maintitle: '<h1>土星/SATURN</h1>'
  }
});

// 1ページ目
planetVue.page1 = `<div class="title">
                     <h2>
                       土星の特徴
                     </h2>
                   </div>
                   <div id="saturnimg1">
                     <p>
                       <img src="../images/planet/saturn.jpg" alt="土星情報">土星は木星型惑星と呼ばれる、ガスの惑星。太陽系では木星の次に大きい惑星で、地球の9倍もある。ですが、土星の平均密度は水の0.7倍なので土星を浮かべられるほど大きなプールがあったとしたら、土星は　水に浮いてしまう。
                       <br>
                       土星の大気は水素96％、ヘリウム3％、メタン0.0045％、アンモニア0.0001％となっています。木星に似ている。
                     </p>
                   </div>
                   <div class="clear"></div>

                   <div class="title">
                     <h2>
                       巨大な環
                     </h2>
                   </div>
                   <div id="saturnimg2">
                     <p>
                       円盤のように見える土星の環は、たくさんの細い環が集まったものである。最初に発見したのは、ガリレオ・ガリレイですが、彼は環とは認識できなかった。正しい形が明らかにされたのは1655年、オランダの天文学者クリスチャン・ホイヘンスによってでした。その環は、岩石や氷のつぶの集まり。粒の大きさは数mmから数m。表面は水やアンモニアの氷で覆われている。
                     </p>
                   </div>`

// 2ページ目
planetVue.page2 = `<div id="saturnimg2">
                     <p>
                       <img src="../images/planet/saturnring.jpg" alt="土星の環">1675年にはフランスの天文学者ジョバンニ・カッシーニが、土星の環は複数の細い環からできていて、隙間が開いている部分があることを発見した。最も幅が広い隙間は「カッシーニの間隙」と呼ばれている。
                       <br>
                       土星の環がどのようにしてできたのかは明らかになっていませんが、土星の衛星や捕獲した彗星などが土星に近づきすぎて、潮汐力によってこなごなになったものと考えられている。「スポーク」と呼ばれる暗い模様が見られますが、なぜこのような模様が生じているのか、分かっていない。
                     </p>
                   </div>

                   <div classs="title">
                     <h2>
                       消える環
                     </h2>
                   </div>
                   <div>
                     <p>
                       土星の環は、地球の公転軌道面に対して約26度傾いている。そのため、土星の公転につれて、地球から見える環の傾きが変わる。そして、環はその厚さが最大でも数百mしかないため、真横から見ると地球からは見えなくなってしまう。環の消失は約15年ごとに起こる。
                     </p>
                   </div>`

// QRコード
qr.planet = 'saturn'
qr.planetQR = '土星QRコード'
