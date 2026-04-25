'use strict';

// ============ THREE.js モック ============
const mockLoad = jest.fn(url => ({ url, isTexture: true }));
global.THREE = {
  MeshStandardMaterial: class {
    constructor(p) { Object.assign(this, p); }
  },
  SphereGeometry: class {
    constructor(r, w, h) {
      this.radius         = r;
      this.widthSegments  = w;
      this.heightSegments = h;
    }
  },
  TorusGeometry: class {
    constructor(r, tube, rs, ts) {
      this.radius         = r;
      this.tube           = tube;
      this.radialSegments = rs;
      this.tubularSegments = ts;
    }
  },
  TextureLoader: class {
    load(url) { return mockLoad(url); }
  },
  DoubleSide: 2
};

// ============ ブラウザ API スタブ ============
global.Vue = class { constructor() {} };
global.window = { location: { hash: '' }, onhashchange: null };

// planet.js を require
const {
  planet: PlanetClass,
  ring: RingClass,
  Cloud: CloudClass,
  initLoadingAnimation
} = require('../js/planet.js');

// ============ planet クラスのテスト ============
describe('planet クラス', () => {
  beforeEach(() => { mockLoad.mockClear(); });

  test('コンストラクタでテクスチャをロードする', () => {
    new PlanetClass('../images/earth.jpg', 50, 20, 20);
    expect(mockLoad).toHaveBeenCalledWith('../images/earth.jpg');
  });

  test('Geometry が SphereGeometry を返す', () => {
    const p = new PlanetClass('../images/mercury.jpg', 5, 16, 16);
    expect(p.Geometry).toBeInstanceOf(THREE.SphereGeometry);
    expect(p.Geometry.radius).toBe(5);
    expect(p.Geometry.widthSegments).toBe(16);
    expect(p.Geometry.heightSegments).toBe(16);
  });

  test('Material が MeshStandardMaterial を返す', () => {
    const p = new PlanetClass('../images/mars.jpg', 7, 20, 20);
    expect(p.Material).toBeInstanceOf(THREE.MeshStandardMaterial);
    expect(p.Material.map).toBeDefined();
  });

  test('同じ画像パスで2つのインスタンスを作ると独立している', () => {
    const p1 = new PlanetClass('../images/sun.jpg', 50, 40, 40);
    const p2 = new PlanetClass('../images/sun.jpg', 30, 20, 20);
    expect(p1.Geometry.radius).toBe(50);
    expect(p2.Geometry.radius).toBe(30);
  });
});

// ============ ring クラスのテスト ============
describe('ring クラス', () => {
  beforeEach(() => { mockLoad.mockClear(); });

  test('コンストラクタでリングテクスチャをロードする', () => {
    new RingClass('../images/saturn-ring.jpg', 50, 13, 2, 1000);
    expect(mockLoad).toHaveBeenCalledWith('../images/saturn-ring.jpg');
  });

  test('Geometry が TorusGeometry を返す', () => {
    const r = new RingClass('../images/saturn-ring.jpg', 50, 13, 2, 1000);
    expect(r.Geometry).toBeInstanceOf(THREE.TorusGeometry);
    expect(r.Geometry.radius).toBe(50);
    expect(r.Geometry.tube).toBe(13);
  });

  test('Material が transparent: true を持つ', () => {
    const r = new RingClass('../images/uranus-ring.jpg', 45, 10, 2, 1000);
    expect(r.Material.transparent).toBe(true);
    expect(r.Material.opacity).toBe(0.7);
  });

  test('Material が MeshStandardMaterial を返す', () => {
    const r = new RingClass('../images/saturn-ring.jpg', 50, 13, 2, 1000);
    expect(r.Material).toBeInstanceOf(THREE.MeshStandardMaterial);
  });
});

// ============ Cloud クラスのテスト ============
describe('Cloud クラス', () => {
  beforeEach(() => { mockLoad.mockClear(); });

  test('コンストラクタで雲テクスチャをロードする', () => {
    new CloudClass('../images/crowd.png', 51, 20, 20);
    expect(mockLoad).toHaveBeenCalledWith('../images/crowd.png');
  });

  test('Geometry が SphereGeometry を返す', () => {
    const c = new CloudClass('../images/crowd.png', 51, 20, 20);
    expect(c.Geometry).toBeInstanceOf(THREE.SphereGeometry);
    expect(c.Geometry.radius).toBe(51);
  });

  test('Material が transparent: true かつ DoubleSide を持つ', () => {
    const c = new CloudClass('../images/crowd.png', 51, 20, 20);
    expect(c.Material.transparent).toBe(true);
    expect(c.Material.side).toBe(THREE.DoubleSide);
  });

  test('Material が MeshStandardMaterial を返す', () => {
    const c = new CloudClass('../images/crowd.png', 51, 20, 20);
    expect(c.Material).toBeInstanceOf(THREE.MeshStandardMaterial);
  });
});

// ============ initLoadingAnimation のテスト ============
describe('initLoadingAnimation()', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="loadingbg1" class="loadingbg"></div>
      <div id="loadingbg2" class="loadingbg"></div>
      <div id="loadingbg3" class="loadingbg"></div>
      <div id="planetloadWrap"></div>
    `;
  });

  test('デフォルト遅延でアニメーションクラスを追加する', () => {
    jest.useFakeTimers();
    initLoadingAnimation();

    jest.advanceTimersByTime(700);
    expect(document.getElementById('loadingbg1').classList.contains('loadingani1')).toBe(true);
    expect(document.getElementById('loadingbg2').classList.contains('loadingani2')).toBe(true);
    expect(document.getElementById('loadingbg3').classList.contains('loadingani3')).toBe(true);

    jest.advanceTimersByTime(700); // 1400ms
    expect(document.getElementById('planetloadWrap').classList.contains('none')).toBe(true);

    jest.useRealTimers();
  });

  test('カスタム遅延が適用される', () => {
    jest.useFakeTimers();
    initLoadingAnimation({ ani: 900, title: 1600, bg: 2400 });

    jest.advanceTimersByTime(700);
    // まだ ani の 900ms に達していない
    expect(document.getElementById('loadingbg1').classList.contains('loadingani1')).toBe(false);

    jest.advanceTimersByTime(200); // 計 900ms
    expect(document.getElementById('loadingbg1').classList.contains('loadingani1')).toBe(true);

    jest.useRealTimers();
  });

  test('bg 遅延後に loadingbg が none クラスを持つ', () => {
    jest.useFakeTimers();
    initLoadingAnimation();

    jest.advanceTimersByTime(2200);
    const bgs = document.getElementsByClassName('loadingbg');
    for (let i = 0; i < bgs.length; i++) {
      expect(bgs[i].classList.contains('none')).toBe(true);
    }

    jest.useRealTimers();
  });
});
