window.onload = function () {
  document.getElementById('keyupText').focus();
};

// ============ 定数 ============

const PLANET_ROUTES = {
  sun:     './sun.html',
  mercury: './mercury.html',
  venus:   './venus.html',
  earth:   './earth.html',
  moon:    './moon.html',
  mars:    './mars.html',
  jupiter: './jupiter.html',
  saturn:  './saturn.html',
  uranus:  './uranus.html',
  neptune: './neptune.html'
};

// 惑星球体の設定（id, 半径, 分割数, 素材種別, オプション）
const PLANET_PARAMS = [
  { id: 'sun',      radius: 50,   segments: 40, material: 'basic'    },
  { id: 'mercury',  radius:  5,   segments: 20                        },
  { id: 'venus',    radius: 10,   segments: 20                        },
  { id: 'earth',    radius: 13,   segments: 20, cloud: { radius: 14 } },
  { id: 'moon',     radius:  5,   segments: 20                        },
  { id: 'mars',     radius:  7,   segments: 20                        },
  { id: 'jupiter',  radius: 40,   segments: 30                        },
  { id: 'saturn',   radius: 13,   segments: 20, ring: { outer: 22, tube: 5 } },
  { id: 'uranus',   radius: 13,   segments: 20, ring: { outer: 18, tube: 5 } },
  { id: 'neptune',  radius: 17,   segments: 20                        },
  { id: 'universe', radius: 10000, segments: 20, material: 'backside' }
];

// テキストスプライトの設定
const TEXT_PARAMS = [
  { id: 'sun',     src: '../images/suntext.png',     y: 64, scale: [50, 35, 50] },
  { id: 'mercury', src: '../images/mercurytext.png', y: 15, scale: [40, 27, 40] },
  { id: 'venus',   src: '../images/venustext.png',   y: 20, scale: [40, 27, 40] },
  { id: 'earth',   src: '../images/earthtext.png',   y: 25, scale: [40, 27, 40] },
  { id: 'moon',    src: '../images/moontext.png',    y: 16, scale: [17, 17, 17] },
  { id: 'mars',    src: '../images/marstext.png',    y: 19, scale: [40, 27, 40] },
  { id: 'jupiter', src: '../images/jupitertext.png', y: 53, scale: [40, 27, 40] },
  { id: 'saturn',  src: '../images/saturntext.png',  y: 25, scale: [40, 27, 40] },
  { id: 'uranus',  src: '../images/uranustext.png',  y: 25, scale: [50, 20, 40] },
  { id: 'neptune', src: '../images/neptunetext.png', y: 27, scale: [50, 20, 40] }
];

// 公転モード時の軌道半径・速度・初期角度
const MOVE_ORBIT = {
  sun:     { x:   0, z:   0, speed:    0, initTheta:   0 },
  mercury: { x:  80, z:  80, speed: 0.78, initTheta:  10 },
  venus:   { x: 120, z: 120, speed: 0.65, initTheta: 500 },
  earth:   { x: 170, z: 170, speed: 0.59, initTheta:   0 },
  mars:    { x: 230, z: 230, speed: 0.54, initTheta: 100 },
  jupiter: { x: 280, z: 280, speed: 0.43, initTheta: 160 },
  saturn:  { x: 355, z: 355, speed: 0.40, initTheta:  80 },
  uranus:  { x: 415, z: 415, speed: 0.37, initTheta: 200 },
  neptune: { x: 475, z: 475, speed: 0.35, initTheta: 330 },
  moon:    { x:  25, z:  25, speed:  1.0, initTheta:   0 }
};

// 停止モード時の固定位置
const STOP_ORBIT = {
  sun:     { x: -230, z: -230 },
  mercury: { x: -150, z: -150 },
  venus:   { x: -110, z: -110 },
  earth:   { x:  -60, z:  -60 },
  mars:    { x:    0, z:    0 },
  jupiter: { x:   60, z:   60 },
  saturn:  { x:  140, z:  140 },
  uranus:  { x:  200, z:  200 },
  neptune: { x:  260, z:  260 },
  moon:    { x:   25, z:   25 }
};

// 自転速度（負数は逆回転）
const ROTATION_SPEEDS = {
  sun:     0.003,
  mercury: 0.005,
  venus:  -0.005,
  earth:   0.005,
  cloud:   0.008,
  mars:    0.002,
  jupiter: 0.003,
  saturn:  0.004,
  uranus:  0.005,
  neptune: 0.007,
  moon:    0.007
};

// 音声認識テキスト → 惑星名 マッピング
const SPEECH_MAP = {
  '太陽': 'sun',   '3': 'sun',
  '彗星': 'mercury', 'マーキュリー': 'mercury',
  'きんせい': 'venus', 'ヴィーナス': 'venus',
  '地球': 'earth', 'アース': 'earth',
  '月': 'moon',    'ムーン': 'moon',
  '火星': 'mars',  'まず': 'mars',  'まーず': 'mars',
  '木星': 'jupiter', 'ジュピター': 'jupiter',
  '土星': 'saturn',  'サターン': 'saturn',
  '天王星': 'uranus', 'ウラヌス': 'uranus',
  '海王星': 'neptune', 'ネプチューン': 'neptune'
};

// ============ ページ遷移 ============

function planetInbg() {
  for (let i = 1; i <= 4; i++) {
    document.querySelector('.inbg' + i).classList.remove('none');
  }
  for (let i = 1; i <= 4; i++) {
    (function (index) {
      setTimeout(function () {
        document.querySelector('.inbg' + index).classList.add('inbgani' + index);
      }, (index - 1) * 100);
    })(i);
  }
}

function navigateToPlanet(name) {
  if (!(name in pickTargets) || pickTargets[name].mesh.length === 0) {
    location.href = PLANET_ROUTES[name];
    return;
  }

  const mesh = pickTargets[name].mesh[0];
  const worldPos = new THREE.Vector3();
  mesh.getWorldPosition(worldPos);

  const projected = worldPos.clone().project(camera);
  const px = ((projected.x + 1) / 2 * 100).toFixed(1);
  const py = ((-projected.y + 1) / 2 * 100).toFixed(1);
  document.documentElement.style.setProperty('--zoom-x', px + '%');
  document.documentElement.style.setProperty('--zoom-y', py + '%');

  controls.enabled = false;
  const startPos = camera.position.clone();
  const endPos = worldPos.clone().lerp(startPos, 0.3);
  const duration = 500;
  const startTime = performance.now();

  function animateZoom(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = t * t * (3 - 2 * t);
    camera.position.lerpVectors(startPos, endPos, eased);
    camera.lookAt(worldPos);
    if (t < 1) {
      requestAnimationFrame(animateZoom);
    } else {
      location.href = PLANET_ROUTES[name];
    }
  }
  requestAnimationFrame(animateZoom);
}

// ============ ローディング ============
// progress / complete は loadQueue イベントで制御（下部参照）

// ============ Vue インスタンス ============

let loading = new Vue({
  el: '#loading',
  data: {
    loading: `<div class="loadingimg loadingIn" tabindex="-1">
                <img src="../images/loadingimage.png" alt="ローリング画像" tabindex="-1">
                <div id="cnt" tabindex="-1">
                  <p tabindex="-1"><span class="count fontType">0</span>％</p>
                </div>
              </div>`
  }
});

let operation = new Vue({
  el: '#operationwrap',
  data: {
    opetitle: '操作説明',
    page1: `<div class="operation" tabindex="-1">
              <img src="../images/operation_one.png" alt="クリック画像" tabindex="-1">
              <div class="text" tabindex="-1">
                <p tabindex="-1">①惑星を選択すると...？</p>
              </div>
            </div>
            <p class="arrow" tabindex="-1">&gt;</p>
            <div class="operation" tabindex="-1">
              <img src="../images/operation_twe.png" alt="勉強例" tabindex="-1">
              <div class="text" tabindex="-1">
                <p tabindex="-1">②誰よりも物知りに！</p>
              </div>
            </div>
            <div class="clear" tabindex="-1"></div>`,
    page2: `<div class="list">
              <ul>
                <li tabindex="-1">
                  <img src="../images/user_off.png" alt="ユーザーボタン" tabindex="-1"> アカウント管理が出来る。<br>Aキーでも可能。
                </li>
                <div class="clear" tabindex="-1"></div>
                <li tabindex="-1">
                  <img src="../images/stop_off.png" alt="ストップボタン" tabindex="-1">惑星の動きを制御出来る。(3段階)<br>Sキーでも可能。
                </li>
                <div class="clear" tabindex="-1"></div>
                <li tabindex="-1">
                  <img src="../images/speech_off.png" alt="音声認識ボタン" tabindex="-1">音声入力によって惑星選択が出来る。<br>Dキーでも可能。
                </li>
                <div class="clear" tabindex="-1"></div>
                <li tabindex="-1">
                  <img src="../images/operation_off.png" alt="操作説明ボタン" tabindex="-1">操作説明表示が出来る。 <br>Fキーでも可能。
                </li>
                <li>
                  <i class="fas fa-vr-cardboard fa-4x"></i>
                  <br>
                  VR機能あり！（使用には携帯が必要です）
                </li>
              </ul>
            </div>`,
    p1: true,
    p2: false,
    pbtn: false,
    nbtn: true,
    opeback: '<img src="../images/ope_back.png" alt="戻るボタン" tabindex="-1">',
    items: [
      { bg: '<div class="stars" tabindex="-1"></div>'    },
      { bg: '<div class="twinkling" tabindex="-1"></div>' },
      { bg: '<div class="clouds" tabindex="-1"></div>'    }
    ]
  },
  methods: {
    prev: function () {
      if (this.p2) {
        this.pbtn = !this.pbtn;
        this.p1   = !this.p1;
        this.p2   = !this.p2;
        this.nbtn = !this.nbtn;
      }
    },
    next: function () {
      if (this.p1) {
        this.pbtn = !this.pbtn;
        this.p1   = !this.p1;
        this.p2   = !this.p2;
        this.nbtn = !this.nbtn;
      }
    }
  }
});

let btnWrapU = new Vue({
  el: '#userWrap',
  data: { imgChange: '_off' },
  methods: {
    mouseover:  function () { this.imgChange = '_on';  },
    mouseleave: function () { this.imgChange = '_off'; }
  }
});

let userWrap = new Vue({
  el: '.infoWrap',
  data: {
    items: [
      { div: `<button id="userBack" tabindex="-1" onclick="uback();"><img src="../images/back_on.png" alt="戻るボタン"></button>` },
      { div: `<div id="user" tabindex="-1"><p tabindex="-1">ゲスト<br>さん</p></div>` },
      { div: `<div id="logintime" tabindex="-1"><p tabindex="-1">--- 日時 ---<br><span id="today" tabindex="-1"></span><br><span id="time" tabindex="-1"></span></p></div>` },
      { div: `<div id="logout" class="lognone" tabindex="-1"><img src="../images/rogo.png" alt="ロゴ"></div>` }
    ]
  }
});

let btnWrapS = new Vue({
  el: '#stopWrap',
  data: { imgChange: '_off' },
  methods: {
    mouseover:  function () { this.imgChange = '_on';  },
    mouseleave: function () { this.imgChange = '_off'; }
  }
});

let btnWrapA = new Vue({
  el: '#speechWrap',
  data: { imgChange: '_off' },
  methods: {
    mouseover:  function () { this.imgChange = '_on';  },
    mouseleave: function () { this.imgChange = '_off'; }
  }
});

let mic = new Vue({
  el: '#mic',
  data: {
    mic: `<div class="masc none" tabindex="-1"></div>
            <div class="micWrap micOut" tabindex="-1">
              <p>どの<span>惑星</span>を選びますか?</p>
              <div class="micImg">
                <i class="fa fa-microphone mic" aria-hidden="true"></i>
                <div class="volume-viewer-volume"></div>
              </div>
            </div>`
  }
});

let btnWrapO = new Vue({
  el: '#opewrapbtn',
  data: { imgChange: '_off' },
  methods: {
    mouseover:  function () { this.imgChange = '_on';  },
    mouseleave: function () { this.imgChange = '_off'; }
  }
});

let bggo = new Vue({
  el: '#bggo',
  data: {
    items: [
      { bg: '<div class="inbg inbg1 none" tabindex="-1"></div>' },
      { bg: '<div class="inbg inbg2 none" tabindex="-1"></div>' },
      { bg: '<div class="inbg inbg3 none" tabindex="-1"></div>' },
      { bg: '<div class="inbg inbg4 none" tabindex="-1"></div>' }
    ]
  }
});

// キーボードショートカット（数字キー 1〜0 で惑星選択）
Vue.config.keyCodes = {
  su: 49, me: 50, v: 51, e: 52, mo: 53,
  ma: 54,  j: 55, sa: 56, u: 57,  n: 48
};

let body = new Vue({
  el: '#keyup',
  methods: {
    su: function () { navigateToPlanet('sun');     },
    me: function () { navigateToPlanet('mercury'); },
    v:  function () { navigateToPlanet('venus');   },
    e:  function () { navigateToPlanet('earth');   },
    mo: function () { navigateToPlanet('moon');    },
    ma: function () { navigateToPlanet('mars');    },
    j:  function () { navigateToPlanet('jupiter'); },
    sa: function () { navigateToPlanet('saturn');  },
    u:  function () { navigateToPlanet('uranus');  },
    n:  function () { navigateToPlanet('neptune'); }
  }
});

let vr = new Vue({
  el: '#vr',
  data: {
    vr: '',
    vr_i: `<i class="fas fa-vr-cardboard"></i>`
  },
  methods: {
    mouseover:  function () { this.vr = 'vrani'; },
    mouseleave: function () { this.vr = '';      },
    vrIn: function () {
      qr.qrdisplay = 'dis';
      qr.qrAni     = '';
      qr.qrImg     = 'qrIn';
      document.getElementById('stage').classList.remove('plamouse');
    }
  }
});

let qr = new Vue({
  el: '#qr',
  data: {
    qrdisplay: 'disnone',
    qrAni:  'none',
    qrImg:  'qrOut',
    img: `<img src="../images/qr/planet.png" alt="惑星QRコード">`
  },
  methods: {
    qrClick: function () {
      setTimeout(() => { this.qrdisplay = 'disnone'; }, 600);
      this.qrAni = 'none';
      this.qrImg = 'qrOut';
      document.getElementById('stage').classList.add('plamouse');
    }
  }
});

// ============ UI 操作関数 ============

function ubtn() {
  const stage    = document.querySelector('#stage');
  const userinfo = document.querySelector('.userinfo');
  const logout   = document.querySelector('#logout');
  if (!stage.classList.contains('speechopen') && userinfo.classList.contains('userOut')) {
    userinfo.classList.remove('userOut');
    userinfo.classList.add('userIn');
    logout.classList.remove('lognone');
    logout.classList.add('logblock');
    stage.classList.add('useropen');
  }
}

function uback() {
  const userinfo = document.querySelector('.userinfo');
  const logout   = document.querySelector('#logout');
  if (!userinfo.classList.contains('userOut')) {
    userinfo.classList.remove('userIn');
    userinfo.classList.add('userOut');
    logout.classList.remove('logblock');
    logout.classList.add('lognone');
    document.querySelector('#stage').classList.remove('useropen');
  }
}

function closeSpeechUI() {
  document.querySelector('.speechBtn').classList.remove('speechout');
  document.getElementById('stage').classList.remove('speechopen');
  document.querySelector('.micWrap').classList.remove('micIn');
  document.querySelector('.micWrap').classList.add('micOut');
  document.querySelector('.masc').classList.add('none');
  clearTimeout(speechtime);
}

function abtn() {
  if (!document.querySelector('.speechBtn').classList.contains('speechout')) {
    recognition.start();
    document.getElementById('stage').classList.add('speechopen');
    document.querySelector('.speechBtn').classList.add('speechout');
    document.querySelector('.micWrap').classList.add('micIn');
    document.querySelector('.micWrap').classList.remove('micOut');
    document.querySelector('.masc').classList.remove('none');
    speechtime = setTimeout(closeSpeechUI, 5000);
  }
}

document.querySelector('.masc').addEventListener('click', function () {
  if (!document.querySelector('.masc').classList.contains('none')) {
    recognition.stop();
    closeSpeechUI();
  }
});

function sbtn() {
  const stage = document.getElementById('stage');
  if (stage.classList.contains('move')) {
    stage.classList.remove('move');
    stage.classList.remove('moveani');
  } else if (!stage.classList.contains('stop')) {
    stage.classList.add('stop');
    setTimeout(function () { stage.classList.add('stopani'); }, 50);
  } else {
    stage.classList.remove('stop');
    stage.classList.remove('stopani');
    stage.classList.add('move');
    setTimeout(function () { stage.classList.add('moveani'); }, 50);
  }
}

function obtn() {
  const stage = document.getElementById('stage');
  if (!stage.classList.contains('speechopen')) {
    if (stage.classList.contains('plamouse')) {
      stage.classList.remove('plamouse');
      document.querySelector('.operationWrap').classList.remove('operationout');
      document.querySelector('.userinfo').classList.remove('userIn');
      document.getElementById('logout').classList.remove('logblock');
      document.querySelector('.userinfo').classList.add('userOut');
      document.querySelector('.operationWrap').classList.add('operationin');
      document.getElementById('logout').classList.add('lognone');
    } else {
      document.querySelector('.operationWrap').classList.remove('operationin');
      document.querySelector('.operationWrap').classList.add('operationout');
      stage.classList.add('plamouse');
    }
  }
}

function bbtn() {
  if (!document.querySelector('.operationWrap').classList.contains('operationout')) {
    document.querySelector('#stage').classList.add('plamouse');
    document.querySelector('.operationWrap').classList.remove('operationin');
    document.querySelector('.operationWrap').classList.add('operationout');
  }
}

// ============ Three.js 変数 ============

const scene    = new THREE.Scene();
const width    = window.innerWidth;
const height   = window.innerHeight;
const stageEl  = document.querySelector('#stage'); // render ループ内で再利用

// ライト
const light   = new THREE.PointLight(0xffffff, 3, 0);
const ambient = new THREE.AmbientLight(0x222222);
scene.add(light);
scene.add(ambient);

// カメラ
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000000);

// カメラ操作
const controls = new THREE.OrbitControls(camera);
controls.minDistance    = 350;
controls.maxDistance    = 800;
controls.enableDamping  = true;
controls.enableKeys     = false;
controls.enablePan      = false;
controls.dampingFactor  = 0.1;

// レンダラー
const renderer = new THREE.WebGLRenderer({ canvas: stageEl });
renderer.setSize(width, height);

// ============ テキストスプライト生成 ============

/**
 * テキストスプライトを生成して返す。
 * @param {string} src  - 画像パス
 * @param {number} y    - Y方向オフセット
 * @param {number[]} scale - [x, y, z]
 * @returns {THREE.Sprite}
 */
function createTextSprite(src, y, scale) {
  const material = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load(src)
  });
  const sprite = new THREE.Sprite(material);
  sprite.position.y = y;
  sprite.scale.set(scale[0], scale[1], scale[2]);
  return sprite;
}

// TEXT_PARAMS に基づいてスプライトを一括生成
const textSprites = {}; // { sun: Sprite, mercury: Sprite, ... }
TEXT_PARAMS.forEach(function (p) {
  textSprites[p.id] = createTextSprite(p.src, p.y, p.scale);
});

// ============ ピッキングターゲット ============

// { id: { mesh: [Mesh], label: [Sprite] } }
const pickTargets = {};
PLANET_PARAMS.forEach(function (p) {
  if (p.id !== 'universe') {
    pickTargets[p.id] = { mesh: [], label: [] };
  }
});
if (textSprites) {
  Object.keys(textSprites).forEach(function (id) {
    pickTargets[id].label.push(textSprites[id]);
  });
}

// ============ 惑星オブジェクト ============

let planetMeshes = {}; // { sun: Object3D, mercury: Object3D, ... }
let cloudMesh;         // 地球の雲

// 公転角度（ラジアン）
const thetas = {
  mercury: 0, venus: 0, earth: 0, mars: 0,
  jupiter: 0, saturn: 0, uranus: 0, neptune: 0, moon: 0
};

// 現在の軌道半径（モード切替で変化）
const pos = {
  sun:     { x: 0,   z: 0 },
  mercury: { x: 0,   z: 0 },
  venus:   { x: 0,   z: 0 },
  earth:   { x: 0,   z: 0 },
  mars:    { x: 0,   z: 0 },
  jupiter: { x: 0,   z: 0 },
  saturn:  { x: 0,   z: 0 },
  uranus:  { x: 0,   z: 0 },
  neptune: { x: 0,   z: 0 },
  moon:    { x: 0,   z: 0 }
};

// ============ 惑星生成ファクトリ ============

function buildPlanet(params, textures) {
  const { id, radius, segments, material: matType, cloud: cloudCfg, ring: ringCfg } = params;
  const texture = textures[id];

  let mesh;
  if (matType === 'basic') {
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
    );
  } else if (matType === 'backside') {
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide })
    );
    scene.add(mesh);
    return mesh;
  } else {
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshLambertMaterial({ map: texture })
    );
  }

  if (textSprites[id]) {
    mesh.add(textSprites[id]);
    pickTargets[id].mesh.push(mesh);
  }

  if (id === 'sun' || id === 'moon') {
    // 太陽・月はグループを使わず Mesh を直接シーンに追加
    scene.add(mesh);
    return mesh;
  }

  const group = new THREE.Group();
  group.add(mesh);

  if (cloudCfg) {
    cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(cloudCfg.radius, segments, segments),
      new THREE.MeshLambertMaterial({ map: textures.crowd, transparent: true, side: THREE.DoubleSide })
    );
    group.add(cloudMesh);
  }

  if (ringCfg) {
    const ringMesh = new THREE.Mesh(
      new THREE.TorusGeometry(ringCfg.outer, ringCfg.tube, 2, 1000),
      new THREE.MeshPhongMaterial({ map: texture, opacity: 0.7, transparent: true })
    );
    ringMesh.rotation.x = 1.5;
    group.add(ringMesh);
  }

  scene.add(group);
  return group;
}

// ============ テクスチャロード ============

const manifest = [
  { id: 'sun',         src: '../images/sun.jpg'         },
  { id: 'mercury',     src: '../images/mercury.jpg'     },
  { id: 'venus',       src: '../images/venus.jpg'       },
  { id: 'earth',       src: '../images/earth.jpg'       },
  { id: 'crowd',       src: '../images/crowd.png'       },
  { id: 'mars',        src: '../images/mars.jpg'        },
  { id: 'jupiter',     src: '../images/jupiter.jpg'     },
  { id: 'saturn',      src: '../images/saturn.jpg'      },
  { id: 'saturn-ring', src: '../images/saturn-ring.jpg' },
  { id: 'uranus',      src: '../images/uranus.jpg'      },
  { id: 'uranus-ring', src: '../images/uranus-ring.jpg' },
  { id: 'neptune',     src: '../images/neptune.jpg'     },
  { id: 'universe',    src: '../images/space.jpg'       },
  { id: 'moon',        src: '../images/moon.jpg'        }
];

const loadQueue = new createjs.LoadQueue();

loadQueue.on('progress', function (e) {
  document.querySelector('.count').innerText = Math.floor(e.progress * 100);
});

loadQueue.on('complete', function () {
  document.querySelector('.count').innerText = 100;
  document.querySelector('.loading').classList.add('loadingOut');
  document.querySelector('.loadingimg').classList.add('loadingOut');

  if (backcnt > 0) {
    document.querySelector('#stage').classList.add('plamouse');
    document.querySelector('.operationWrap').classList.remove('operationin');
    document.querySelector('.operationWrap').classList.add('operationout');
  }

  // 画像 → THREE.Texture 変換
  const textures = {};
  manifest.forEach(function (item) {
    const img = loadQueue.getResult(item.id);
    const tex = new THREE.Texture(img);
    tex.needsUpdate = true;
    textures[item.id] = tex;
  });

  // 惑星をまとめて生成
  PLANET_PARAMS.forEach(function (params) {
    planetMeshes[params.id] = buildPlanet(params, textures);
  });

  render();

  setTimeout(function () {
    document.getElementById('stage').classList.add('moveani');
  }, 800);
});

loadQueue.loadManifest(manifest);

// ============ レンダリングループ ============

function render() {
  requestAnimationFrame(render);

  // 自転
  planetMeshes.sun.rotation.y      += ROTATION_SPEEDS.sun;
  planetMeshes.mercury.rotation.y  += ROTATION_SPEEDS.mercury;
  planetMeshes.venus.rotation.y    += ROTATION_SPEEDS.venus;
  planetMeshes.earth.rotation.y    += ROTATION_SPEEDS.earth;
  if (cloudMesh) cloudMesh.rotation.y += ROTATION_SPEEDS.cloud;
  planetMeshes.mars.rotation.y     += ROTATION_SPEEDS.mars;
  planetMeshes.jupiter.rotation.y  += ROTATION_SPEEDS.jupiter;
  planetMeshes.saturn.rotation.y   += ROTATION_SPEEDS.saturn;
  planetMeshes.uranus.rotation.y   += ROTATION_SPEEDS.uranus;
  planetMeshes.neptune.rotation.y  += ROTATION_SPEEDS.neptune;
  planetMeshes.moon.rotation.y     += ROTATION_SPEEDS.moon;

  if (stageEl.classList.contains('move')) {
    // ===== 公転モード =====
    light.position.set(0, 0, 0);

    // 軌道半径をセット
    Object.keys(MOVE_ORBIT).forEach(function (id) {
      pos[id].x = MOVE_ORBIT[id].x;
      pos[id].z = MOVE_ORBIT[id].z;
    });

    // 公転角度を更新
    ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'moon'].forEach(function (id) {
      thetas[id] -= MOVE_ORBIT[id].speed;
    });

    // 初期角度（公転開始時のみ）
    if (!stageEl.classList.contains('moveani')) {
      Object.keys(MOVE_ORBIT).forEach(function (id) {
        if (id !== 'sun') thetas[id] = MOVE_ORBIT[id].initTheta;
      });
      camera.position.set(400, 400, 800);
    }

  } else if (stageEl.classList.contains('stop')) {
    // ===== 停止モード =====
    light.position.set(pos.sun.x, 0, 0);

    Object.keys(STOP_ORBIT).forEach(function (id) {
      pos[id].x = STOP_ORBIT[id].x;
      pos[id].z = STOP_ORBIT[id].z;
      if (id !== 'sun') thetas[id] = 0;
    });

    if (!stageEl.classList.contains('stopani')) {
      camera.position.set(0, 0, 300);
    }
  }

  // 位置更新（三角関数で楕円軌道）
  const degToRad = THREE.Math.degToRad;
  planetMeshes.sun.position.x     = Math.cos(degToRad(thetas.mercury)) * pos.sun.x;
  planetMeshes.sun.position.z     = Math.sin(degToRad(thetas.mercury)) * pos.sun.z;
  planetMeshes.mercury.position.x = Math.cos(degToRad(thetas.mercury)) * pos.mercury.x;
  planetMeshes.mercury.position.z = Math.sin(degToRad(thetas.mercury)) * pos.mercury.z;
  planetMeshes.venus.position.x   = Math.cos(degToRad(thetas.venus))   * pos.venus.x;
  planetMeshes.venus.position.z   = Math.sin(degToRad(thetas.venus))   * pos.venus.z;
  planetMeshes.earth.position.x   = Math.cos(degToRad(thetas.earth))   * pos.earth.x;
  planetMeshes.earth.position.z   = Math.sin(degToRad(thetas.earth))   * pos.earth.z;
  planetMeshes.mars.position.x    = Math.cos(degToRad(thetas.mars))    * pos.mars.x;
  planetMeshes.mars.position.z    = Math.sin(degToRad(thetas.mars))    * pos.mars.z;
  planetMeshes.jupiter.position.x = Math.cos(degToRad(thetas.jupiter)) * pos.jupiter.x;
  planetMeshes.jupiter.position.z = Math.sin(degToRad(thetas.jupiter)) * pos.jupiter.z;
  planetMeshes.saturn.position.x  = Math.cos(degToRad(thetas.saturn))  * pos.saturn.x;
  planetMeshes.saturn.position.z  = Math.sin(degToRad(thetas.saturn))  * pos.saturn.z;
  planetMeshes.uranus.position.x  = Math.cos(degToRad(thetas.uranus))  * pos.uranus.x;
  planetMeshes.uranus.position.z  = Math.sin(degToRad(thetas.uranus))  * pos.uranus.z;
  planetMeshes.neptune.position.x = Math.cos(degToRad(thetas.neptune)) * pos.neptune.x;
  planetMeshes.neptune.position.z = Math.sin(degToRad(thetas.neptune)) * pos.neptune.z;
  // 月は地球を中心に公転
  planetMeshes.moon.position.x = Math.cos(degToRad(thetas.moon)) * pos.moon.x + planetMeshes.earth.position.x;
  planetMeshes.moon.position.z = Math.sin(degToRad(thetas.moon)) * pos.moon.z + planetMeshes.earth.position.z;

  controls.update();
  renderer.render(scene, camera);
}

// ============ ピッキング処理 ============

// Raycaster を使い回す（クリックごとに new しない）
const raycaster = new THREE.Raycaster();
const mouse     = new THREE.Vector2();

document.addEventListener('mousedown', function clickPosition(event) {
  mouse.x =  (event.clientX / window.innerWidth)  * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const canClick = stageEl.classList.contains('plamouse') &&
                   !stageEl.classList.contains('useropen') &&
                   !stageEl.classList.contains('speechopen');

  if (!canClick) return;

  raycaster.setFromCamera(mouse, camera);

  // 各惑星の mesh と label を結合して判定
  const hitPlanet = Object.keys(pickTargets).find(function (id) {
    const t = pickTargets[id];
    return raycaster.intersectObjects(t.mesh).length > 0 ||
           raycaster.intersectObjects(t.label).length > 0;
  });

  if (hitPlanet) {
    navigateToPlanet(hitPlanet);
  }
}, false);

// ============ 音声認識 ============

let speechtime;
const recognition = new webkitSpeechRecognition();
recognition.lang = 'ja-JP';

recognition.addEventListener('result', function (e) {
  const text      = e.results[0][0].transcript;
  const planetId  = SPEECH_MAP[text];

  if (planetId) {
    navigateToPlanet(planetId);
  } else {
    closeSpeechUI();
  }
});

// ============ 時計 ============

function getNow() {
  const now  = new Date();
  const hour = String(now.getHours()).padStart(2, '0');
  const min  = String(now.getMinutes()).padStart(2, '0');
  return hour + '：' + min;
}

function getToday() {
  const now = new Date();
  const mon = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return mon + '/' + day;
}

function clock() {
  document.getElementById('time').innerHTML  = getNow();
  document.getElementById('today').innerHTML = getToday();
}

setInterval(clock, 500);

// ============ AudioManager ============

let manager = new AudioManager({
  useMicrophone: true,
  onEnterFrame: function () {
    const volume = Utils.sum(this.analysers.mic.getByteFrequencyData());
    const size   = 92 + volume / 2000;
    const adj    = (80 - size) / 2 - 3;
    const el     = document.querySelector('.volume-viewer-volume');
    el.style.height = size + 'px';
    el.style.width  = size + 'px';
    el.style.top    = adj  + 'px';
    el.style.left   = adj  + 'px';
  }
}).init();

// ============ テスト用エクスポート（Node.js 環境のみ） ============
if (typeof module !== 'undefined') {
  module.exports = {
    getNow,
    getToday,
    navigateToPlanet,
    planetInbg,
    PLANET_ROUTES,
    SPEECH_MAP,
    MOVE_ORBIT,
    STOP_ORBIT,
    ROTATION_SPEEDS
  };
}
