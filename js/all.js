window.onload = function () {
  document.getElementById("keyupText").focus();
};

// ****************** 遷移 ******************
// 共通
function planetInbg() {
  document.querySelector(".inbg1").classList.remove("none");
  document.querySelector(".inbg2").classList.remove("none");
  document.querySelector(".inbg3").classList.remove("none");
  document.querySelector(".inbg4").classList.remove("none");

  document.querySelector(".inbg1").classList.add("inbgani1");
  setTimeout(function () {
    document.querySelector(".inbg2").classList.add("inbgani2");
    setTimeout(function () {
      document.querySelector(".inbg3").classList.add("inbgani3");
      setTimeout(function () {
        document.querySelector(".inbg4").classList.add("inbgani4");
      }, 100);
    }, 100);
  }, 100);
};

function sunPage() { // 太陽
  planetInbg();
  setTimeout(function () {
    location.href = "./html/sun.html";
  }, 410);
  // console.log('a')
};

function mercuryPage() { // 水星
  planetInbg();
  setTimeout(function () {
    location.href = "./html/mercury.html";
  }, 410);
};

function venusPage() { // 金星
  planetInbg();
  setTimeout(function () {
    location.href = "./html/venus.html";
  }, 410);
};

function earthPage() { // 地球
  planetInbg();
  setTimeout(function () {
    location.href = "./html/earth.html";
  }, 410);
};

function moonPage() { // 月
  planetInbg();
  setTimeout(function () {
    location.href = "./html/moon.html";
  }, 410);
};


function marsPage() { // 火星
  planetInbg();
  setTimeout(function () {
    location.href = "./html/mars.html";
  }, 410);
};

// 木星
function jupiterPage() {
  planetInbg();
  setTimeout(function () {
    location.href = "./html/jupiter.html";
  }, 410);
};


function saturnPage() { // 土星
  planetInbg();
  setTimeout(function () {
    location.href = "./html/saturn.html";
  }, 410);
};

function uranusPage() { // 天王星
  planetInbg();
  setTimeout(function () {
    location.href = "./html/uranus.html";
  }, 410);
};

function neptunePage() { // 海王星
  planetInbg();
  setTimeout(function () {
    location.href = "./html/neptune.html";
  }, 410);
};

// ****************** ローディング ******************
setTimeout(function () {
  let num = 0;
  let tgt = 100;
  let speed = 8;
  setInterval(function () {
    if (num <= tgt) {
      document.querySelector(".count").innerText = num;
      num++;
      if (num == tgt) {
        document.querySelector(".loading").classList.add("loadingOut");
        document.querySelector(".loadingimg").classList.add("loadingOut");
      }
      if (backcnt > 0) {
        document.querySelector("#stage").classList.add("plamouse");
        document.querySelector(".operationWrap").classList.remove("operationin");
        document.querySelector(".operationWrap").classList.add("operationout");
      }
    }
  }, speed);
}, 700);

// 初回Class付与
setTimeout(function () {
  document.getElementById("stage").classList.add("moveani");
}, 1500);

// ****************** vue ******************
// ローディング
let loading = new Vue({
  el: "#loading",
  data: {
    loading: `<div class="loadingimg loadingIn" tabindex="-1">
                <img src="./images/loadingimage.png" alt="ローリング画像" tabindex="-1">
                <div id="cnt" tabindex="-1">
                  <p tabindex="-1"><span class="count fontType">0</span>％</p>
                </div>
              </div>`
  }
});

let operation = new Vue({ // 操作説明
  el: "#operationwrap",
  data: {
    // 1ページ目
    opetitle: `操作説明`,
    page1: `<div class="operation" tabindex="-1">
              <img src="./images/operation_one.png" alt="クリック画像" tabindex="-1">
              <div class="text" tabindex="-1">
                <p tabindex="-1">①惑星を選択すると...？</p>
              </div>
            </div>
            <p class="arrow" tabindex="-1">&gt;</p>
            <div class="operation" tabindex="-1">
              <img src="./images/operation_twe.png" alt="勉強例" tabindex="-1">
              <div class="text" tabindex="-1">
                <p tabindex="-1">②誰よりも物知りに！</p>
              </div>
            </div>
            <div class="clear" tabindex ="-1"></div>`,

    page2: `<div class="list">
              <ul>
                <li tabindex="-1">
                <img src="./images/user_off.png" alt="ユーザーボタン" tabindex="-1"> アカウント管理が出来る。<br>Aキーでも可能。
                </li>
                <div class="clear" tabindex="-1"></div>
                <li tabindex="-1">
                  <img src="./images/stop_off.png" alt="ストップボタン" tabindex="-1">惑星の動きを制御出来る。(3段階)<br>Sキーでも可能。
                </li>
                <div class="clear" tabindex="-1"></div>
                <li tabindex="-1">
                  <img src="./images/speech_off.png" alt="音声認識ボタン" tabindex="-1">音声入力によって惑星選択が出来る。<br>Dキーでも可能。
                </li>
                <div class="clear" tabindex="-1"></div>
                <li tabindex="-1">
                  <img src="./images/operation_off.png" alt="操作説明ボタン" tabindex="-1">操作説明表示が出来る。 <br>Fキーでも可能。
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
    opeback: '<img src="./images/ope_back.png" alt="戻るボタン" tabindex="-1">',
    items: [{
        bg: '<div class="stars" tabindex="-1"></div>'
      },
      {
        bg: '<div class="twinkling" tabindex="-1"></div>'
      },
      {
        bg: '<div class="clouds" tabindex="-1"></div>'
      }
    ]
  },
  methods: {
    prev: function () {
      if (this.p2 == true) {
        // 2ページ目
        this.pbtn = !this.pbtn;
        this.p1 = !this.p1;
        this.p2 = !this.p2;
        this.nbtn = !this.nbtn;
      }
    },
    next: function () {
      if (this.p1 == true) {
        // 2ページ目
        this.pbtn = !this.pbtn;
        this.p1 = !this.p1;
        this.p2 = !this.p2;
        this.nbtn = !this.nbtn;
      }
    }
  }
});

let btnWrapU = new Vue({ // ユーザ
  el: "#userWrap",
  data: {
    imgChange: '_off'
  },
  methods: {
    mouseover: function () {
      this.imgChange = '_on';
    },
    mouseleave: function () {
      this.imgChange = '_off';
    }
  }
});

let userWrap = new Vue({
  el: '.infoWrap',
  data: {
    items: [{
      div: `<button id="userBack" tabindex="-1" onclick="uback();"><img src="./images/back_on.png" alt="戻るボタン"></button>`
    }, {
      div: `<div id="user" tabindex="-1">
              <p tabindex="-1">
                ゲスト<br>さん
              </p>
            </div>`
    }, {
      div: `<div id="logintime" tabindex="-1">
              <p tabindex="-1">
                --- 日時 ---<br><span id="today" tabindex="-1"></span><br><span id="time" tabindex="-1"></span>
              </p>
            </div>`
    }, {
      div: `<div id="logout" class="lognone" tabindex="-1">
              <img src="./images/rogo.png"alt="ロゴ">
          </div>`
    }]
  }
});

// 惑星操作
let btnWrapS = new Vue({
  el: "#stopWrap",
  data: {
    imgChange: '_off'
  },
  methods: {
    mouseover: function () {
      this.imgChange = '_on';
    },
    mouseleave: function () {
      this.imgChange = '_off';
    }
  }
});

// API
let btnWrapA = new Vue({
  el: "#speechWrap",
  data: {
    imgChange: '_off'
  },
  methods: {
    mouseover: function () {
      this.imgChange = '_on';
    },
    mouseleave: function () {
      this.imgChange = '_off';
    }
  }
});

let mic = new Vue({
  el: "#mic",
  data: {
    mic: `<div class="masc none" tabindex="-1"></div>
            <div class = "micWrap micOut" tabindex = "-1">
              <p>どの<span>惑星</span>を選びますか?</p>
              <div class="micImg">
                <i class="fa fa-microphone mic" aria-hidden="true"></i>
              <div class="volume-viewer-volume"></div>
            </div>
          </div>`
  }
});

// 操作説明
let btnWrapO = new Vue({
  el: "#opewrapbtn",
  data: {
    imgChange: '_off'
  },
  methods: {
    mouseover: function () {
      this.imgChange = '_on';
    },
    mouseleave: function () {
      this.imgChange = '_off';
    }
  }
});

let bggo = new Vue({
  el: "#bggo",
  data: {
    items: [{
        bg: '<div class="inbg inbg1 none" tabindex="-1"></div>'
      },
      {
        bg: '<div class="inbg inbg2 none" tabindex="-1"></div>'
      },
      {
        bg: '<div class="inbg inbg3 none" tabindex="-1"></div>'
      },
      {
        bg: '<div class="inbg inbg4 none" tabindex="-1"></div>'
      }
    ]
  }
});

Vue.config.keyCodes = {
  su: 49,
  su: [49],
  me: 50,
  me: [50],
  v: 51,
  v: [51],
  e: 52,
  e: [52],
  mo: 53,
  mo: [53],
  ma: 54,
  ma: [54],
  j: 55,
  j: [55],
  sa: 56,
  sa: [56],
  u: 57,
  u: [57],
  n: 48,
  n: [48]
};
let body = new Vue({
  el: "#keyup",
  methods: {
    su: function () {
      sunPage();
      // console.log('a')
    },
    me: function () {
      mercuryPage();
    },
    v: function () {
      venusPage();
    },
    e: function () {
      earthPage();
    },
    mo: function () {
      moonPage();
    },
    ma: function () {
      marsPage();
    },
    j: function () {
      jupiterPage();
    },
    sa: function () {
      saturnPage();
    },
    u: function () {
      uranusPage();
    },
    n: function () {
      neptunePage();
    }
  }
});

// VR
let vr = new Vue({
  el: '#vr',
  data: {
    vr: '',
    vr_i: `<i class="fas fa-vr-cardboard"></i>`,
  },
  methods: {
    mouseover: function () {
      this.vr = 'vrani'
    },
    mouseleave: function () {
      this.vr = ''
    },
    vrIn: function () {
      qr.qrdisplay = 'dis'
      qr.qrAni = ''
      qr.qrImg = 'qrIn'
      document.getElementById('stage').classList.remove('plamouse');
    }
  },
});

// QR
let qr = new Vue({
  el: '#qr',
  data: {
    qrdisplay: 'disnone',
    qrAni: 'none',
    qrImg: 'qrOut',
    img: `<img src="../images/qr/planet.png" alt=" 惑星QRコード">`
  },
  methods: {
    qrClick: function () {
      setTimeout(() => {
        this.qrdisplay = 'disnone'
      }, 600)
      this.qrAni = 'none'
      this.qrImg = 'qrOut'
      document.getElementById('stage').classList.add('plamouse');
    }
  }
});

// 戻り禁止
window.location.hash = "#noback";
window.onhashchange = function () {
  window.location.hash = "#noback";
};

// ユーザ
function ubtn() {
  if (!document.querySelector("#stage").classList.contains("speechopen")) {
    if (document.querySelector(".userinfo").classList.contains("userOut")) {
      document.querySelector(".userinfo").classList.remove("userOut");
      document.querySelector("#logout").classList.remove("lognone");
      document.querySelector(".userinfo").classList.add("userIn");
      document.querySelector("#logout").classList.add("logblock");
      document.querySelector("#stage").classList.add("useropen");
    }
  }
}
// ユーザーバック
function uback() {
  if (!document.querySelector(".userinfo").classList.contains("userOut")) {
    document.querySelector(".userinfo").classList.remove("userIn");
    document.querySelector("#logout").classList.remove("logblock");
    document.querySelector("#stage").classList.remove("useropen");
    document.querySelector(".userinfo").classList.add("userOut");
    document.querySelector("#logout").classList.add("lognone");
  }
}

// API
function abtn() {
  if (!document.querySelector(".speechBtn").classList.contains("speechout")) {
    recognition.start();
    document.getElementById("stage").classList.add("speechopen");
    document.querySelector(".speechBtn").classList.add("speechout");
    document.querySelector(".micWrap").classList.add("micIn");
    document.querySelector(".micWrap").classList.remove("micOut");
    document.querySelector(".masc").classList.remove("none");
    speechtime = setTimeout(function () {
      document.querySelector(".speechBtn").classList.remove("speechout");
      document.querySelector("#stage").classList.remove("speechopen");
      document.querySelector(".micWrap").classList.remove("micIn");
      document.querySelector(".micWrap").classList.add("micOut");
      document.querySelector(".masc").classList.add("none");
    }, 5000);
  }
}
document.querySelector(".masc").addEventListener("click", function () {
  if (!document.querySelector(".masc").classList.contains("none")) {
    recognition.stop();
    document.querySelector(".speechBtn").classList.remove("speechout");
    document.getElementById("stage").classList.remove("speechopen");
    document.querySelector(".micWrap").classList.remove("micIn");
    document.querySelector(".micWrap").classList.add("micOut");
    document.querySelector(".masc").classList.add("none");
    clearTimeout(speechtime);
  }
});

// 惑星操作
function sbtn() {
  if (document.getElementById("stage").classList.contains("move")) {
    document.getElementById("stage").classList.remove("move");
    document.getElementById("stage").classList.remove("moveani");
  } else if (!document.getElementById("stage").classList.contains("stop")) {
    if (!document.getElementById("stage").classList.contains("move")) {
      document.getElementById("stage").classList.add("stop");
      setTimeout(function () {
        document.getElementById("stage").classList.add("stopani");
      }, 50);
    }
  } else if (document.getElementById("stage").classList.contains("stop")) {
    document.getElementById("stage").classList.remove("stop");
    document.getElementById("stage").classList.add("move");
    document.getElementById("stage").classList.remove("stopani");
    setTimeout(function () {
      document.getElementById("stage").classList.add("moveani");
    }, 50);
  }
}

// 操作説明
function obtn() {
  if (!document.getElementById("stage").classList.contains("speechopen")) {
    if (document.getElementById("stage").classList.contains("plamouse")) {
      document.getElementById("stage").classList.remove("plamouse");
      document.querySelector(".operationWrap").classList.remove("operationout");
      document.querySelector(".userinfo").classList.remove("userIn");
      document.getElementById("logout").classList.remove("logblock");
      document.querySelector(".userinfo").classList.add("userOut");
      document.querySelector(".operationWrap").classList.add("operationin");
      document.getElementById("logout").classList.add("lognone");
    } else if (
      !document.getElementById("stage").classList.contains("plamouse")
    ) {
      document.querySelector(".operationWrap").classList.remove("operationin");
      document.querySelector(".operationWrap").classList.add("operationout");
      document.getElementById("stage").classList.add("plamouse");
    }
  }
}
// back
function bbtn() {
  if (
    !document.querySelector(".operationWrap").classList.contains("operationout")
  ) {
    document.querySelector("#stage").classList.add("plamouse");
    document.querySelector(".operationWrap").classList.remove("operationin");
    document.querySelector(".operationWrap").classList.add("operationout");
  }
}

// ******************変数定義******************
let scene = new THREE.Scene();
let camera;
let light;
let ambient;
let gridHelper;
let axisHelper;
let lightHelper;
let renderer;
let loader;
let width = window.innerWidth; //要修正
let height = window.innerHeight; //要修正
let controls;

//ピッキング処理用変数
let targetSun = [];
let targetMercury = [];
let targetVenus = [];
let targetEarth = [];
let targetMars = [];
let targetJupiter = [];
let targetSaturn = [];
let targetUranus = [];
let targetNeptune = [];
let targetMoon = [];

// テクスチャー
let textureSun;
let textureMercury;
let textureVenus;
let textureEarth;
let textureCrowd;
let textureMars;
let textureJupiter;
let textureSaturn;
let textureSaturnRing;
let textureUranus;
let textureUranusRing;
let textureNeptune;
let textureUniverse;
let textureMoon;

// オブジェクト
let sun;
let mercury;
let venus;
let earth;
let crowd;
let mars;
let jupiter;
let saturn;
let saturnRing;
let uranus;
let uranusRing;
let neptune;
let universe;
let moon;

// ポジション
let sunX;
let sunZ;
let mercuryX;
let mercuryZ;
let venusX;
let venusZ;
let earthX;
let earthZ;
let marsX;
let marsZ;
let jupiterX;
let jupiterZ;
let saturnX;
let saturnZ;
let uranusX;
let uranusZ;
let neptuneX;
let neptuneZ;
let moonX;
let moonZ;

let mercuryTheta;
let venusTheta;
let earthTheta;
let marsTheta;
let jupiterTheta;
let saturnTheta;
let uranusTheta;
let neptuneTheta;
let moonTheta;

// テキストイメージ
let sunimageText;
let mercuryimageText;
let venusimageText;
let earthimageText;
let moonimageText;
let marsimageText;
let jupiterimageText;
let saturnimageText;
let uranusimageText;
let neptuneimageText;

// テキスト
let sunText;
let mercuryText;
let venusText;
let earthText;
let moonText;
let marsText;
let jupiterText;
let saturnText;
let uranusText;
let neptuneText;

let targetTextSun = [];
let targetTextMercury = [];
let targetTextVenus = [];
let targetTextEarth = [];
let targetTextMoon = [];
let targetTextMars = [];
let targetTextJupiter = [];
let targetTextSaturn = [];
let targetTextUranus = [];
let targetTextNeptune = [];

// 保存
let speechtime;

// マイク
let manager;

// テクスチャーリスト
let manifest = [{
    id: "sun",
    src: "./images/sun.jpg"
  }, // 太陽
  {
    id: "mercury",
    src: "./images/mercury.jpg"
  }, // 水星
  {
    id: "venus",
    src: "./images/venus.jpg"
  }, // 金星
  {
    id: "earth",
    src: "./images/earth.jpg"
  }, // 地球
  {
    id: "crowd",
    src: "./images/crowd.png"
  }, // 雲
  {
    id: "mars",
    src: "./images/mars.jpg"
  }, // 火星
  {
    id: "jupiter",
    src: "./images/jupiter.jpg"
  }, // 木星
  {
    id: "saturn",
    src: "./images/saturn.jpg"
  }, // 土星
  {
    id: "saturn-ring",
    src: "./images/saturn-ring.jpg"
  }, // 土星の輪
  {
    id: "uranus",
    src: "./images/uranus.jpg"
  }, // 天王星
  {
    id: "uranus-ring",
    src: "./images/uranus-ring.jpg"
  }, // 天王星の輪
  {
    id: "neptune",
    src: "./images/neptune.jpg"
  }, // 海王星
  {
    id: "universe",
    src: "./images/space.jpg"
  }, // 宇宙空間
  {
    id: "moon",
    src: "./images/moon.jpg"
  } //月
];

// ロードキューを作成
let loadQueue = new createjs.LoadQueue();

// ロード完了を監視
loadQueue.on("complete", function () {
  // loadQueueから画像データ取得
  let sunImg = loadQueue.getResult("sun");
  let mercuryImg = loadQueue.getResult("mercury");
  let venusImg = loadQueue.getResult("venus");
  let earthImg = loadQueue.getResult("earth");
  let crowdImg = loadQueue.getResult("crowd");
  let marsImg = loadQueue.getResult("mars");
  let jupiterImg = loadQueue.getResult("jupiter");
  let saturnImg = loadQueue.getResult("saturn");
  let saturnRingImg = loadQueue.getResult("saturn-ring");
  let uranusImg = loadQueue.getResult("uranus");
  let uranusRingImg = loadQueue.getResult("uranus-ring");
  let neptuneImg = loadQueue.getResult("neptune");
  let universeImg = loadQueue.getResult("universe");
  let moonImg = loadQueue.getResult("moon");

  // three.jsテクスチャー変換
  textureSun = new THREE.Texture(sunImg);
  textureMercury = new THREE.Texture(mercuryImg);
  textureVenus = new THREE.Texture(venusImg);
  textureEarth = new THREE.Texture(earthImg);
  textureCrowd = new THREE.Texture(crowdImg);
  textureMars = new THREE.Texture(marsImg);
  textureJupiter = new THREE.Texture(jupiterImg);
  textureSaturn = new THREE.Texture(saturnImg);
  textureSaturnRing = new THREE.Texture(saturnRingImg);
  textureUranus = new THREE.Texture(uranusImg);
  textureUranusRing = new THREE.Texture(uranusRingImg);
  textureNeptune = new THREE.Texture(neptuneImg);
  textureUniverse = new THREE.Texture(universeImg);
  textureMoon = new THREE.Texture(moonImg);

  // 更新許可
  textureSun.needsUpdate = true;
  textureMercury.needsUpdate = true;
  textureVenus.needsUpdate = true;
  textureEarth.needsUpdate = true;
  textureCrowd.needsUpdate = true;
  textureMars.needsUpdate = true;
  textureJupiter.needsUpdate = true;
  textureSaturn.needsUpdate = true;
  textureSaturnRing.needsUpdate = true;
  textureUranus.needsUpdate = true;
  textureUranusRing.needsUpdate = true;
  textureNeptune.needsUpdate = true;
  textureUniverse.needsUpdate = true;
  textureMoon.needsUpdate = true;

  sun = planetFactory(textureSun, 50, 40, 40, sunX, sunZ, "isSun");
  mercury = planetFactory(textureMercury, 5, 20, 20, mercuryX, mercuryZ, "isMercury");
  venus = planetFactory(textureVenus, 10, 20, 20, venusX, venusZ, "isVenus");
  earth = planetFactory(textureEarth, 13, 20, 20, earthX, earthZ, "isEarth");
  mars = planetFactory(textureMars, 7, 20, 20, marsX, marsZ, "isMars");
  jupiter = planetFactory(textureJupiter, 40, 30, 30, jupiterX, jupiterZ, "isJupiter");
  saturn = planetFactory(textureSaturn, 18, 20, 20, saturnX, saturnZ, "isSaturn");
  uranus = planetFactory(textureUranus, 20, 20, 20, uranusX, uranusZ, "isUranus");
  neptune = planetFactory(textureNeptune, 17, 20, 20, neptuneX, neptuneZ, "isNeptune");
  universe = planetFactory(textureUniverse, 10000, 20, 20, 0, 0, "isUniverse");
  moon = planetFactory(textureMoon, 5, 20, 20, 0, 0, "isMoon");
  render();
});

// テクスチャーロード
loadQueue.loadManifest(manifest);

// 点光源
light = new THREE.PointLight(0xffffff, 3, 0);
scene.add(light);

// 環境光
ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient);

// カメラ
camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000000);

// カメラ操作
controls = new THREE.OrbitControls(camera);
controls.minDistance = 350; //カメラ最小値
controls.maxDistance = 800; //カメラ最大値
controls.enableDamping = true; //滑らか
controls.enableKeys = false; //矢印
controls.enablePan = false; //水平方向
controls.dampingFactor = 0.1;

// レンダラー
renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#stage")
});
renderer.setSize(width, height);

function planetFactory(texture, radius, widthSegments, heightSegments, x, z, planetName) {
  let sphere,
    sphereMercury,
    sphereVenus,
    sphereEarth,
    sphereMars,
    sphereJupiter,
    sphereSaturn,
    sphereUranus,
    sphereNeptune,
    ring;

  if (planetName === "isSun") {
    //太陽
    sphere = new THREE.Group();

    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments),
      new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide // 裏
      })
    );

    sphere.add(sunText);
    targetSun.push(sphere);

    sphere.position.set(x, 0, z);
  } else if (planetName === "isMercury") {
    // 水星
    sphere = new THREE.Group();
    sphereMercury = new THREE.Group();

    sphereMercury = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments),
      new THREE.MeshLambertMaterial({
        map: texture
      })
    );

    sphere.add(sphereMercury);
    sphereMercury.add(mercuryText);
    targetMercury.push(sphereMercury);

    sphere.position.set(x, 0, z);
  } else if (planetName === "isVenus") {
    // 金星
    //グループ化
    sphere = new THREE.Group();
    sphereVenus = new THREE.Group();

    sphereVenus = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments),
      new THREE.MeshLambertMaterial({
        map: texture
      })
    );

    sphere.add(sphereVenus);
    sphereVenus.add(venusText);
    targetVenus.push(sphereVenus);

    sphere.position.set(x, 0, z);
  } else if (planetName === "isEarth") {
    // 地球
    sphere = new THREE.Group();
    sphereEarth = new THREE.Group();

    sphereEarth = new THREE.Mesh(
      new THREE.SphereGeometry(13, 20, 20),
      new THREE.MeshLambertMaterial({
        map: texture
      })
    );

    crowd = new THREE.Mesh(
      new THREE.SphereGeometry(14, 20, 20),
      new THREE.MeshLambertMaterial({
        map: textureCrowd,
        transparent: true,
        side: THREE.DoubleSide // 裏
      })
    );

    sphereEarth.add(earthText);
    sphere.add(sphereEarth);
    sphere.add(crowd);
    targetEarth.push(sphereEarth);

    sphere.position.set(x, 0, z);
  } else if (planetName === "isMoon") {
    // 月
    sphere = new THREE.Group();

    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments),
      new THREE.MeshLambertMaterial({
        map: texture
      })
    );

    sphere.add(moonText);
    targetMoon.push(sphere);

    sphere.position.set(x, 0, z);
  } else if (planetName === "isMars") {
    // 火星
    sphere = new THREE.Group();
    sphereMars = new THREE.Group();

    sphereMars = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments),
      new THREE.MeshLambertMaterial({
        map: texture
      })
    );

    sphereMars.add(marsText);
    sphere.add(sphereMars);
    targetMars.push(sphereMars);

    sphere.position.set(x, 0, z);
  } else if (planetName === "isJupiter") {
    // 木星
    sphere = new THREE.Group();
    sphereJupiter = new THREE.Group();

    sphereJupiter = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments),
      new THREE.MeshLambertMaterial({
        map: texture
      })
    );

    sphereJupiter.add(jupiterText);
    sphere.add(sphereJupiter);
    targetJupiter.push(sphereJupiter);

    sphere.position.set(x, 0, z);
  } else if (planetName === "isSaturn") {
    // 土星
    sphere = new THREE.Group();
    sphereSaturn = new THREE.Group();

    sphereSaturn = new THREE.Mesh(
      new THREE.SphereGeometry(13, 20, 20),
      new THREE.MeshLambertMaterial({
        map: texture
      })
    );

    // 輪
    ring = new THREE.Mesh(
      new THREE.TorusGeometry(22, 5, 2, 1000),
      new THREE.MeshPhongMaterial({
        map: texture,
        opacity: 0.7,
        transparent: true
      })
    );
    ring.rotation.x = 1.5;

    sphereSaturn.add(saturnText);
    sphere.add(sphereSaturn);
    sphere.add(ring);

    targetSaturn.push(sphereSaturn);

    sphere.position.set(x, 0, z);
  } else if (planetName === "isUranus") {
    // 天王星
    sphere = new THREE.Group();
    sphereUranus = new THREE.Group();

    sphereUranus = new THREE.Mesh(
      new THREE.SphereGeometry(13, 20, 20),
      new THREE.MeshLambertMaterial({
        map: texture
      })
    );

    // 輪
    ring = new THREE.Mesh(
      new THREE.TorusGeometry(18, 5, 2, 1000),
      new THREE.MeshPhongMaterial({
        map: texture,
        opacity: 0.7,
        transparent: true
      })
    );
    ring.rotation.x = 1.5;

    sphereUranus.add(uranusText);
    sphere.add(sphereUranus);
    sphere.add(ring);

    targetUranus.push(sphereUranus);

    sphere.position.set(x, 0, z);
  } else if (planetName === "isNeptune") {
    // 海王星
    sphere = new THREE.Group();
    sphereNeptune = new THREE.Group();

    sphereNeptune = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments),
      new THREE.MeshLambertMaterial({
        map: texture
      })
    );

    sphereNeptune.add(neptuneText);
    sphere.add(sphereNeptune);
    targetNeptune.push(sphereNeptune);

    sphere.position.set(x, 0, z);
  } else if (planetName === "isUniverse") {
    // 宇宙
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments),
      new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.DoubleSide // 裏
      })
    );
    sphere.position.set(x, 0, z);
  }
  scene.add(sphere);
  return sphere;
}

function render() {
  requestAnimationFrame(render);
  //自転
  sun.rotation.y += 0.003;
  mercury.rotation.y += 0.005;
  venus.rotation.y -= 0.005;
  earth.rotation.y += 0.005;
  crowd.rotation.y += 0.008;
  mars.rotation.y += 0.002;
  jupiter.rotation.y += 0.003;
  saturn.rotation.y += 0.004;
  uranus.rotation.y += 0.005;
  neptune.rotation.y += 0.007;
  moon.rotation.y += 0.007;
  //惑星のスピード
  if (document.querySelector("#stage").classList.contains("move")) {
    // ライト
    light.position.set(0, 0, 0);
    // 公転スピード
    mercuryTheta -= 0.78;
    venusTheta -= 0.65;
    earthTheta -= 0.59;
    marsTheta -= 0.54;
    jupiterTheta -= 0.43;
    saturnTheta -= 0.4;
    uranusTheta -= 0.37;
    neptuneTheta -= 0.35;
    moonTheta -= 1;
    // ポジション
    sunX = 0;
    sunZ = 0;
    mercuryX = 80;
    mercuryZ = 80;
    venusX = 120;
    venusZ = 120;
    earthX = 170;
    earthZ = 170;
    marsX = 230;
    marsZ = 230;
    jupiterX = 280;
    jupiterZ = 280;
    saturnX = 355;
    saturnZ = 355;
    uranusX = 415;
    uranusZ = 415;
    neptuneX = 475;
    neptuneZ = 475;
    moonX = 25;
    moonZ = 25;
    // 開始位置
    if (!document.querySelector("#stage").classList.contains("moveani")) {
      mercuryTheta = 10;
      venusTheta = 500;
      earthTheta = 0;
      marsTheta = 100;
      jupiterTheta = 160;
      saturnTheta = 80;
      uranusTheta = 200;
      neptuneTheta = 330;
      moonTheta = 0;
      camera.position.set(400, 400, 800);
    }
  } else if (document.querySelector("#stage").classList.contains("stop")) {
    // ライト
    light.position.set(sunX, 0, 0);
    // 公転スピード
    mercuryTheta = 0;
    venusTheta = 0;
    earthTheta = 0;
    marsTheta = 0;
    jupiterTheta = 0;
    saturnTheta = 0;
    uranusTheta = 0;
    neptuneTheta = 0;
    moonTheta = 0;
    // ポジション
    sunX = -230;
    sunZ = -230;
    mercuryX = -150;
    mercuryZ = -150;
    venusX = -110;
    venusZ = -110;
    earthX = -60;
    earthZ = -60;
    marsX = 0;
    marsZ = 0;
    jupiterX = 60;
    jupiterZ = 60;
    saturnX = 140;
    saturnZ = 140;
    uranusX = 200;
    uranusZ = 200;
    neptuneX = 260;
    neptuneZ = 260;
    moonX = 25;
    moonZ = 25;
    if (!document.querySelector("#stage").classList.contains("stopani")) {
      camera.position.set(0, 0, 300);
    }
  }

  sun.position.x = Math.cos(THREE.Math.degToRad(mercuryTheta)) * sunX;
  sun.position.z = Math.sin(THREE.Math.degToRad(mercuryTheta)) * sunZ;
  mercury.position.x = Math.cos(THREE.Math.degToRad(mercuryTheta)) * mercuryX;
  mercury.position.z = Math.sin(THREE.Math.degToRad(mercuryTheta)) * mercuryZ;
  venus.position.x = Math.cos(THREE.Math.degToRad(venusTheta)) * venusX;
  venus.position.z = Math.sin(THREE.Math.degToRad(venusTheta)) * venusZ;
  earth.position.x = Math.cos(THREE.Math.degToRad(earthTheta)) * earthX;
  earth.position.z = Math.sin(THREE.Math.degToRad(earthTheta)) * earthZ;
  mars.position.x = Math.cos(THREE.Math.degToRad(marsTheta)) * marsX;
  mars.position.z = Math.sin(THREE.Math.degToRad(marsTheta)) * marsZ;
  jupiter.position.x = Math.cos(THREE.Math.degToRad(jupiterTheta)) * jupiterX;
  jupiter.position.z = Math.sin(THREE.Math.degToRad(jupiterTheta)) * jupiterZ;
  saturn.position.x = Math.cos(THREE.Math.degToRad(saturnTheta)) * saturnX;
  saturn.position.z = Math.sin(THREE.Math.degToRad(saturnTheta)) * saturnZ;
  uranus.position.x = Math.cos(THREE.Math.degToRad(uranusTheta)) * uranusX;
  uranus.position.z = Math.sin(THREE.Math.degToRad(uranusTheta)) * uranusZ;
  neptune.position.x = Math.cos(THREE.Math.degToRad(neptuneTheta)) * neptuneX;
  neptune.position.z = Math.sin(THREE.Math.degToRad(neptuneTheta)) * neptuneZ;
  moon.position.x =
    Math.cos(THREE.Math.degToRad(moonTheta)) * moonX + earth.position.x;
  moon.position.z =
    Math.sin(THREE.Math.degToRad(moonTheta)) * moonZ + earth.position.z;

  controls.update();
  renderer.render(scene, camera);
}

// テキストクラス
class text {
  constructor(textimg) {
    this.testimg = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(textimg)
    });
  }

  get TextImg() {
    return this.testimg;
  }
}

// 太陽テキスト
sunimageText = new text("./images/suntext.png");
sunText = new THREE.Sprite(sunimageText.TextImg);
sunText.position.y = 64;
sunText.scale.set(50, 35, 50);
targetTextSun.push(sunText);

// 水星テキスト
mercuryimageText = new text("./images/mercurytext.png");
mercuryText = new THREE.Sprite(mercuryimageText.TextImg);
mercuryText.position.y = 15;
mercuryText.scale.set(40, 27, 40);
targetTextMercury.push(mercuryText);

// 金星テキスト
venusimageText = new text("./images/venustext.png");
venusText = new THREE.Sprite(venusimageText.TextImg);
venusText.position.y = 20;
venusText.scale.set(40, 27, 40);
targetTextVenus.push(venusText);

// 地球テキスト
earthimageText = new text("./images/earthtext.png");
earthText = new THREE.Sprite(earthimageText.TextImg);
earthText.position.y = 25;
earthText.scale.set(40, 27, 40);
targetTextEarth.push(earthText);

// 月テキスト
moonimageText = new text("./images/moontext.png");
moonText = new THREE.Sprite(moonimageText.TextImg);
moonText.position.y = 16;
moonText.scale.set(17, 17, 17);
targetTextMoon.push(moonText);

// 火星テキスト
marsimageText = new text("./images/marstext.png");
marsText = new THREE.Sprite(marsimageText.TextImg);
marsText.position.y = 19;
marsText.scale.set(40, 27, 40);
targetTextMars.push(marsText);

// 木星テキスト
jupiterimageText = new text("./images/jupitertext.png");
jupiterText = new THREE.Sprite(jupiterimageText.TextImg);
jupiterText.position.y = 53;
jupiterText.scale.set(40, 27, 40);
targetTextJupiter.push(jupiterText);

// 土星テキスト
saturnimageText = new text("./images/saturntext.png");
saturnText = new THREE.Sprite(saturnimageText.TextImg);
saturnText.position.y = 25;
saturnText.scale.set(40, 27, 40);
targetTextSaturn.push(saturnText);

// 天王星テキスト
uranusimageText = new text("./images/uranustext.png");
uranusText = new THREE.Sprite(uranusimageText.TextImg);
uranusText.position.y = 25;
uranusText.scale.set(50, 20, 40);
targetTextUranus.push(uranusText);

// 海王星テキスト
neptuneimageText = new text("./images/neptunetext.png");
neptuneText = new THREE.Sprite(neptuneimageText.TextImg);
neptuneText.position.y = 27;
neptuneText.scale.set(50, 20, 40);
targetTextNeptune.push(neptuneText);

// ******************ピッキング処理******************
document.addEventListener("mousedown", clickPosition, false);

function clickPosition(event) {
  let x = event.clientX;
  let y = event.clientY;
  // マウスクリック位置を正規化
  let mouse = new THREE.Vector2();
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;
  let raycaster = new THREE.Raycaster();
  if (document.querySelector("#stage").classList.contains("plamouse")) {
    if (!document.querySelector("#stage").classList.contains("useropen")) {
      if (!document.querySelector("#stage").classList.contains("speechopen")) {
        raycaster.setFromCamera(mouse, camera);
      }
    }
  }

  // オブジェクトの取得
  let interSu = raycaster.intersectObjects(targetSun);
  let interMe = raycaster.intersectObjects(targetMercury);
  let interVe = raycaster.intersectObjects(targetVenus);
  let interEa = raycaster.intersectObjects(targetEarth);
  let interMa = raycaster.intersectObjects(targetMars);
  let interJu = raycaster.intersectObjects(targetJupiter);
  let interSa = raycaster.intersectObjects(targetSaturn);
  let interUr = raycaster.intersectObjects(targetUranus);
  let interNe = raycaster.intersectObjects(targetNeptune);
  let interMo = raycaster.intersectObjects(targetMoon);

  //テキスト
  let interTSU = raycaster.intersectObjects(targetTextSun);
  let interTME = raycaster.intersectObjects(targetTextMercury);
  let interTV = raycaster.intersectObjects(targetTextVenus);
  let interTE = raycaster.intersectObjects(targetTextEarth);
  let interTMO = raycaster.intersectObjects(targetTextMoon);
  let interTMA = raycaster.intersectObjects(targetTextMars);
  let interTJ = raycaster.intersectObjects(targetTextJupiter);
  let interTSA = raycaster.intersectObjects(targetTextSaturn);
  let interTU = raycaster.intersectObjects(targetTextUranus);
  let interTN = raycaster.intersectObjects(targetTextNeptune);

  //マウス操作
  if (interSu.length > 0 || interTSU.length > 0) {
    // 太陽
    // console.log('太陽');
    sunPage();
  } else if (interMe.length > 0 || interTME.length > 0) {
    // 水星
    mercuryPage();
  } else if (interVe.length > 0 || interTV.length > 0) {
    // 金星
    venusPage();
  } else if (interEa.length > 0 || interTE.length > 0) {
    // 地球
    earthPage();
  } else if (interMa.length > 0 || interTMA.length > 0) {
    // 火星
    venusPage();
  } else if (interJu.length > 0 || interTJ.length > 0) {
    // 木星
    jupiterPage();
  } else if (interSa.length > 0 || interTSA.length > 0) {
    // 土星
    saturnPage();
  } else if (interUr.length > 0 || interTU.length > 0) {
    // 天王星
    uranusPage();
  } else if (interNe.length > 0 || interTN.length > 0) {
    // 海王星
    neptunePage();
  } else if (interMo.length > 0 || interTMO.length > 0) {
    // 月
    moonPage();
  }
}

// ****************** web Speech API ******************
let recognition = new webkitSpeechRecognition();
recognition.lang = "ja-JP"; // 言語設定

recognition.addEventListener("result", function (e) {
  let speechtext = e.results[0][0].transcript;
  switch (speechtext) {
    case "太陽":
      // console.log(e.results[0][0].transcript);
      sunPage();
      break;
    case "3":
      // console.log(e.results[0][0].transcript);
      sunPage();
      break;
    case "彗星":
      // console.log(e.results[0][0].transcript);
      mercuryPage();
      break;
    case "マーキュリー":
      // console.log(e.results[0][0].transcript);
      mercuryPage();
      break;
    case "きんせい":
      // console.log(e.results[0][0].transcript);
      venusPage();
      break;
    case "ヴィーナス":
      // console.log(e.results[0][0].transcript);
      venusPage();
      break;
    case "地球":
      // console.log(e.results[0][0].transcript);
      earthPage();
      break;
    case "アース":
      // console.log(e.results[0][0].transcript);
      earthPage();
      break;
    case "月":
      // console.log(e.results[0][0].transcript);
      moonPage();
      break;
    case "ムーン":
      // console.log(e.results[0][0].transcript);
      moonPage();
      break;
    case "火星":
      // console.log(e.results[0][0].transcript);
      marsPage();
      break;
    case "まず":
      // console.log(e.results[0][0].transcript);
      marsPage();
      break;
    case "まーず":
      // console.log(e.results[0][0].transcript);
      marsPage();
      break;
    case "木星":
      // console.log(e.results[0][0].transcript);
      jupiterPage();
      break;
    case "ジュピター":
      // console.log(e.results[0][0].transcript);
      jupiterPage();
      break;
    case "土星":
      // console.log(e.results[0][0].transcript);
      saturnPage();
      break;
    case "サターン":
      // console.log(e.results[0][0].transcript);
      saturnPage();
      break;
    case "天王星":
      // console.log(e.results[0][0].transcript);
      uranusPage();
      break;
    case "ウラヌス":
      // console.log(e.results[0][0].transcript);
      uranusPage();
      break;
    case "海王星":
      // console.log(e.results[0][0].transcript);
      neptunePage();
      break;
    case "ネプチューン":
      // console.log(e.results[0][0].transcript);
      neptunePage();
      break;
    default: // その他
      // console.log(e.results[0][0].transcript);
      document.querySelector(".speechBtn").classList.remove("speechout");
      document.querySelector("#stage").classList.remove("speechopen");
      document.querySelector(".micWrap").classList.remove("micIn");
      document.querySelector(".micWrap").classList.add("micOut");
      document.querySelector(".masc").classList.add("none");
      clearTimeout(speechtime);
      break;
  }
});

// 監視
let timerID = setInterval("clock()", 500);

function clock() {
  document.getElementById("time").innerHTML = getNow();
  document.getElementById("today").innerHTML = getToday();
}

// 時間
function getNow() {
  let now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (min < 10) {
    min = "0" + min;
  }

  let totime = hour + "：" + min;
  return totime;
}

// 日付
function getToday() {
  let now = new Date();
  let mon = now.getMonth() + 1;
  let day = now.getDate();

  if (mon < 10) {
    mon = "0" + mon;
  }

  if (day < 10) {
    day = "0" + day;
  }

  //出力用
  let today = mon + "/" + day;
  return today;
}

// ******************AudioManager******************
manager = new AudioManager({
  useMicrophone: true,
  onEnterFrame: function () {
    let volume = Utils.sum(this.analysers.mic.getByteFrequencyData());
    let size = 92 + volume / 2000;
    let adj = (80 - size) / 2 - 3;

    document.querySelector(".volume-viewer-volume").style.height = size + "px";
    document.querySelector(".volume-viewer-volume").style.width = size + "px";
    document.querySelector(".volume-viewer-volume").style.top = adj + "px";
    document.querySelector(".volume-viewer-volume").style.left = adj + "px";
  }
}).init();
