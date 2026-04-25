// 戻り禁止
window.location.hash = '#noback';
window.onhashchange = function () {
  window.location.hash = '#noback';
};

// ============ 惑星基底クラス ============

class planet {
  constructor(imgSrc, radius, widthSegments, heightSegments) {
    this.material = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(imgSrc)
    });
    this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  }

  get Material() {
    return this.material;
  }

  get Geometry() {
    return this.geometry;
  }
}

class ring {
  constructor(imgSrc, ringRadius, tube, radialSegments, tubularSegments) {
    this.material = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(imgSrc),
      opacity: 0.7,
      transparent: true
    });
    this.geometry = new THREE.TorusGeometry(ringRadius, tube, radialSegments, tubularSegments);
  }

  get Material() {
    return this.material;
  }

  get Geometry() {
    return this.geometry;
  }
}

class Cloud {
  constructor(imgSrc, radius, widthSegments, heightSegments) {
    this.material = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(imgSrc),
      transparent: true,
      side: THREE.DoubleSide
    });
    this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  }

  get Material() {
    return this.material;
  }

  get Geometry() {
    return this.geometry;
  }
}

// ============ 共通ローディングアニメーション ============

/**
 * 惑星ページのローディングアニメーションを開始する。
 * @param {object} delays - { ani: number, title: number, bg: number }
 */
function initLoadingAnimation(delays) {
  const d = Object.assign({ ani: 700, title: 1400, bg: 2200 }, delays);
  const loadingbg = document.getElementsByClassName('loadingbg');

  setTimeout(function () {
    for (let i = 1; i <= 3; i++) {
      document.getElementById('loadingbg' + i).classList.add('loadingani' + i);
    }
  }, d.ani);

  setTimeout(function () {
    document.getElementById('planetloadWrap').classList.add('none');
  }, d.title);

  setTimeout(function () {
    for (let i = 0; i < 3; i++) {
      loadingbg[i].classList.add('none');
    }
  }, d.bg);
}

// ============ 共通シーン生成 ============

/**
 * Three.js のレンダラー・シーン・カメラ・コントロール・ライトをまとめて生成する。
 * @returns {{ scene, camera, controls, renderer }}
 */
function createPlanetScene() {
  const width = document.getElementById('stage').clientWidth;
  const height = innerHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#stage')
  });
  renderer.setSize(width, height);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 200);

  const controls = new THREE.OrbitControls(camera);
  controls.minDistance = 200;
  controls.maxDistance = 200;
  controls.enableDamping = true;
  controls.enableKeys = false;
  controls.enablePan = false;
  controls.dampingFactor = 0.6;

  const light = new THREE.AmbientLight(0xFFFFFF, 2.0);
  scene.add(light);

  return { scene, camera, controls, renderer };
}

/**
 * アニメーションループを開始する。
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 * @param {THREE.OrbitControls} controls
 * @param {THREE.WebGLRenderer} renderer
 * @param {function} onTick - 毎フレーム呼ばれるコールバック
 */
function startRenderLoop(scene, camera, controls, renderer, onTick) {
  function tick() {
    onTick();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
}

// ============ 共通 Vue インスタンス ============

let planetVue = new Vue({
  el: '#planet',
  data: {
    text: true,
    btn: false,
    page1: '',
    page2: '',
    pBtn: `<img src="../images/arrowprev.png" alt="戻る">`,
    nBtn: `<img src="../images/arrownext.png" alt="進む">`
  },
  methods: {
    prevBtn: function () {
      this.text = !this.text;
      this.btn = !this.btn;
    },
    nextBtn: function () {
      this.text = !this.text;
      this.btn = !this.btn;
    }
  }
});

let loadingBGWrap = new Vue({
  el: '#loadingBGWrap',
  data: {
    bgs: [
      { bg: '<div id="loadingbg1" class="loadingbg"></div>' },
      { bg: '<div id="loadingbg2" class="loadingbg"></div>' },
      { bg: '<div id="loadingbg3" class="loadingbg"></div>' }
    ]
  }
});

let back = new Vue({
  el: '#backBtn',
  data: {
    back: `<div id="back">
             <button onClick='location.href = "./index.html";'>BACK</button>
           </div>`
  }
});

let vr = new Vue({
  el: '#vr',
  data: {
    vr: '',
    vr_i: `<i class="fas fa-vr-cardboard"></i>`
  },
  methods: {
    mouseover: function () {
      this.vr = 'vrani';
    },
    mouseleave: function () {
      this.vr = '';
    },
    vrIn: function () {
      qr.qrdisplay = 'dis';
      qr.qrAni = '';
      qr.qrImg = 'qrIn';
    }
  }
});

let qr = new Vue({
  el: '#qr',
  data: {
    qrdisplay: 'disnone',
    qrAni: 'none',
    qrImg: 'qrOut',
    planet: '',
    planetQR: ''
  },
  methods: {
    qrClick: function () {
      setTimeout(() => {
        this.qrdisplay = 'disnone';
      }, 600);
      this.qrAni = 'none';
      this.qrImg = 'qrOut';
    }
  }
});

// ============ テスト用エクスポート（Node.js 環境のみ） ============
if (typeof module !== 'undefined') {
  module.exports = { planet, ring, Cloud, initLoadingAnimation, createPlanetScene };
}
