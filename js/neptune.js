// ページ遷移
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

// メッシュ作成
window.addEventListener('load', init);
let scene;
let camera;
let controls;
let neptune = new planet('../images/neptune.jpg', 50, 20, 20);
let material;
let geometry;
let neptuneMesh;
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

  material = neptune.Material;

  geometry = neptune.Geometry;
  neptuneMesh = new THREE.Mesh(geometry, material);
  scene.add(neptuneMesh);

  tick();

  function tick() {
    neptuneMesh.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
};

let neptuneText = new Vue({ // 惑星名
  el: '#planetloadWrap',
  data: {
    neptune: [{
      text: '<p class="text text1">海</p>'
    }, {
      text: '<p class="text text2">王</p>'
    }, {
      text: '<p class="text text3">星</p>'
    }]
  }
});

let maintitle = new Vue({ // タイトル
  el: '#maintitle',
  data: {
    maintitle: '<h1>海王星/NEPTUNE</h1>'
  }
});

// 1ページ目
planetVue.page1 = `<div class="title">
                     <h2>
                       海王星の特徴
                     </h2>
                   </div>
                   <div id="neptuneimg1">
                     <p>
                       <img src="../images/planet/neptune.jpg" alt="海王星情報">海王星の大気は水素80％、ヘリウム19％、メタン2％の成分でできている。ガスでできた木星型惑星なので、大気中は時速2,000kmの強い風や嵐がふいている。
                       <br>
                       木星や土星にはアンモニアがふくまれ、はでな色をしていますが、天王星や海王星は、水素やヘリウムでできた大気の下に、水がいっぱいある層（そう）があって、アンモニアが水にとけこんでいる。そして、メタンが残り、メタンが赤い色をきゅうしゅうして青く見えるのだ。
                       <br>
                       天王星も海王星も青い色をしていて、どちらも同じような大きさで小さな惑星ですが、天王星のほうが重くできているる。木星や土星は水素とヘリウムが主成分ですが、天王星と海王星は水が主成分である。
                     </p>
                   </div>
                   <div class="clear"></div>`

// 2ページ目
planetVue.page2 = `<div class="title">
                     <h2>
                       計算で発見された海王星
                     </h2>
                   </div>
                   <div>
                     <p>
                       天王星の発見以降、その軌道が天文力学の計算に合わないのはその外側にさらに惑星があるためだと考えられていた。
                       <br>
                       そのためいろいろな科学者が未知の惑星の大きさや、軌道、位置を計算していた。イギリスでは天文学者ジョン・クーチ・アダムスが、フランスでは天文学者ユルバン・ルベリエが計算をし、ルベリエの依頼を受けたドイツの天文学者ヨハン・ガレが1846年9月23日、ベルリン天文台での観測で海王星を発見したのだ。ルベリエが計算としたものと発見された位置の誤差は1度。
                     </p>
                   </div>

                   <div class="title">
                     <h2>
                       弧になっている環
                     </h2>
                   </div>
                   <div id="neptuneimg2">
                     <p>
                       <img src="../images/planet/neptunering.jpg" alt="海王星の環">海王星にも環があり、惑星探査機「ボイジャー2号」によって発見された。環は4本発見されていますが、どれも非常に細く、何ヵ所か途切れて弧（アーク）になっている部分も。
                     </p>
                   </div>
                   <div class="clear"></div>`

// QRコード
qr.planet = 'neptune'
qr.planetQR = '海王星QRコード'
