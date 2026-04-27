'use strict';

// ============ THREE.js モック ============
global.THREE = {
  SpriteMaterial: class { constructor(p) { Object.assign(this, p); } },
  Sprite:         class { constructor(m) { this.material = m; this.position = { y: 0 }; this.scale = { set: jest.fn() }; } },
  TextureLoader:  class { load(url) { return { url }; } }
};

// ============ DOM モック ============
// jsdom 環境では document は自動的に提供される
beforeEach(() => {
  document.body.innerHTML = `
    <div id="stage"></div>
    <div class="inbg1 none"></div>
    <div class="inbg2 none"></div>
    <div class="inbg3 none"></div>
    <div class="inbg4 none"></div>
  `;
});

// ============ テスト対象モジュール読み込み ============
// ブラウザ専用 API のスタブ
global.Vue = class {
  constructor() {}
};
global.Vue.config = { keyCodes: {} };
global.webkitSpeechRecognition = class {
  constructor() {}
  start() {}
  stop() {}
  addEventListener() {}
};
global.createjs = { LoadQueue: class { on() {} loadManifest() {} } };
global.THREE.Scene            = class { add() {} };
global.THREE.PerspectiveCamera = class { position = { set: jest.fn() }; };
global.THREE.PointLight       = class { position = { set: jest.fn() }; };
global.THREE.AmbientLight     = class {};
global.THREE.OrbitControls    = class {};
global.THREE.WebGLRenderer    = class { setSize() {} render() {} };
global.THREE.Raycaster        = class { setFromCamera() {} intersectObjects() { return []; } };
global.THREE.Vector2          = class {};
global.THREE.SphereGeometry   = class {};
global.THREE.MeshBasicMaterial    = class { constructor(p) { Object.assign(this, p); } };
global.THREE.MeshLambertMaterial  = class { constructor(p) { Object.assign(this, p); } };
global.THREE.MeshPhongMaterial    = class { constructor(p) { Object.assign(this, p); } };
global.THREE.Mesh             = class { constructor(g, m) { this.geometry = g; this.material = m; this.rotation = { x: 0, y: 0 }; this.position = { x: 0, z: 0 }; } add() {} };
global.THREE.Group            = class { add() {} position = { set: jest.fn(), x: 0, z: 0 }; rotation = { x: 0, y: 0 }; };
global.THREE.TorusGeometry    = class {};
global.THREE.Texture          = class { constructor(img) { this.needsUpdate = false; } };
global.THREE.DoubleSide       = 2;
global.THREE.Math             = { degToRad: (d) => d * Math.PI / 180 };
global.AudioManager           = class { constructor() {} init() { return this; } };
global.Utils                  = { sum: () => 0 };
global.backcnt                = 0;

// querySelector / getElementById がモック DOM に対して動作するよう設定
// （jsdom は標準でサポート）

// all.js のモジュールレベルコードが DOM を参照するため、require 前にセットアップ
document.body.innerHTML = `
  <canvas id="stage"></canvas>
  <div class="masc none"></div>
  <div class="speechBtn"></div>
  <div class="micWrap"></div>
  <div class="count"></div>
  <div class="loading"></div>
  <div class="loadingimg"></div>
  <div class="inbg1 none"></div>
  <div class="inbg2 none"></div>
  <div class="inbg3 none"></div>
  <div class="inbg4 none"></div>
  <div id="keyupText"></div>
  <div id="time"></div>
  <div id="today"></div>
  <div class="operationWrap"></div>
  <div class="volume-viewer-volume"></div>
`;

// all.js を require（テスト用エクスポートを利用）
const allJs = require('../js/all.js');

const { getNow, getToday, navigateToPlanet, planetInbg, PLANET_ROUTES, SPEECH_MAP } = allJs;

// ============ テスト ============

describe('getNow()', () => {
  test('HH：MM 形式で返す', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T09:05:00'));
    expect(getNow()).toBe('09：05');
    jest.useRealTimers();
  });

  test('時・分が10未満でも2桁ゼロ埋めされる', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-06-01T00:00:00'));
    expect(getNow()).toBe('00：00');
    jest.useRealTimers();
  });

  test('23:59 の境界値', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T23:59:00'));
    expect(getNow()).toBe('23：59');
    jest.useRealTimers();
  });
});

describe('getToday()', () => {
  test('MM/DD 形式で返す', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-03-07T12:00:00'));
    expect(getToday()).toBe('03/07');
    jest.useRealTimers();
  });

  test('1月1日は 01/01', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00'));
    expect(getToday()).toBe('01/01');
    jest.useRealTimers();
  });

  test('12月31日は 12/31', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-12-31T00:00:00'));
    expect(getToday()).toBe('12/31');
    jest.useRealTimers();
  });
});

describe('PLANET_ROUTES', () => {
  test('全10惑星のルートが定義されている', () => {
    const expected = ['sun', 'mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    expected.forEach(id => {
      expect(PLANET_ROUTES[id]).toBeDefined();
      expect(PLANET_ROUTES[id]).toContain('.html');
    });
  });

  test('各ルートのファイル名が対応する惑星名を含む', () => {
    expect(PLANET_ROUTES.sun).toBe('./sun.html');
    expect(PLANET_ROUTES.earth).toBe('./earth.html');
    expect(PLANET_ROUTES.neptune).toBe('./neptune.html');
  });
});

describe('SPEECH_MAP', () => {
  test('日本語惑星名がマッピングされている', () => {
    expect(SPEECH_MAP['太陽']).toBe('sun');
    expect(SPEECH_MAP['地球']).toBe('earth');
    expect(SPEECH_MAP['月']).toBe('moon');
    expect(SPEECH_MAP['火星']).toBe('mars');
    expect(SPEECH_MAP['海王星']).toBe('neptune');
  });

  test('英語カタカナ表記もマッピングされている', () => {
    expect(SPEECH_MAP['マーキュリー']).toBe('mercury');
    expect(SPEECH_MAP['ジュピター']).toBe('jupiter');
    expect(SPEECH_MAP['ネプチューン']).toBe('neptune');
  });

  test('認識されない語は undefined を返す', () => {
    expect(SPEECH_MAP['ゾーン']).toBeUndefined();
    expect(SPEECH_MAP['']).toBeUndefined();
  });
});

describe('planetInbg()', () => {
  test('.inbg1〜4 から none クラスを除去する', () => {
    planetInbg();
    for (let i = 1; i <= 4; i++) {
      const el = document.querySelector('.inbg' + i);
      expect(el.classList.contains('none')).toBe(false);
    }
  });

  test('setTimeout でアニメーションクラスを追加する', () => {
    jest.useFakeTimers();
    planetInbg();

    jest.advanceTimersByTime(300);
    expect(document.querySelector('.inbg1').classList.contains('inbgani1')).toBe(true);
    expect(document.querySelector('.inbg2').classList.contains('inbgani2')).toBe(true);
    expect(document.querySelector('.inbg3').classList.contains('inbgani3')).toBe(true);
    expect(document.querySelector('.inbg4').classList.contains('inbgani4')).toBe(true);

    jest.useRealTimers();
  });
});

describe('navigateToPlanet()', () => {
  let originalLocation;

  beforeEach(() => {
    // location.href の書き込みをモック
    originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };
  });

  afterEach(() => {
    window.location = originalLocation;
    jest.useRealTimers();
  });

  test('正しい URL にナビゲートする', () => {
    navigateToPlanet('earth');
    expect(window.location.href).toBe('./earth.html');
  });

  test('各惑星名で正しい URL にナビゲートする', () => {
    const planets = Object.keys(PLANET_ROUTES);
    planets.forEach(name => {
      window.location.href = '';
      navigateToPlanet(name);
      expect(window.location.href).toBe(PLANET_ROUTES[name]);
    });
  });
});
