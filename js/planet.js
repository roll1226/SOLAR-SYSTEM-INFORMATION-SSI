// 戻り禁止
window.location.hash = "#noback";
window.onhashchange = function () {
  window.location.hash = "#noback";
};

class planet { // 惑星
  constructor(planetImg, radius, widthSegments, heightSegments) {
    this.planetImg = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(planetImg)
    });
    this.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  }

  get Material() {
    return this.planetImg;
  }

  get Geometry() {
    return this.geometry;
  }
}

class ring { // リング
  constructor(ringImg, ringRadius, thetaSegments, phiSegments, thetaLength) {
    this.ringImg = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(ringImg),
      opacity: 0.7,
      transparent: true
    });;
    this.ringGeometry = new THREE.TorusGeometry(ringRadius, thetaSegments, phiSegments, thetaLength);
  }

  get Material() {
    return this.ringImg;
  }

  get Geometry() {
    return this.ringGeometry;
  }
}


class crowd { // 雲
  constructor(croudImg, croudRdius, crowdWidthSegments, crowdHeightSegments) {
    this.croudImg = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(croudImg),
      transparent: true,
      side: THREE.DoubleSide
    });
    this.croudGeometry = new THREE.SphereGeometry(croudRdius, crowdWidthSegments, crowdHeightSegments);
  }

  get Material() {
    return this.croudImg;
  }

  get Geometry() {
    return this.croudGeometry;
  }
}

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
      this.text = !this.isActive
      this.btn = !this.btn
    },
    nextBtn: function () {
      this.text = !this.text
      this.btn = !this.btn
    }
  }
});

let loadingBGWrap = new Vue({ // background
  el: '#loadingBGWrap',
  data: {
    bgs: [{
      bg: '<div id="loadingbg1" class="loadingbg"></div>'
    }, {
      bg: '<div id="loadingbg2" class="loadingbg"></div>'
    }, {
      bg: '<div id="loadingbg3" class="loadingbg"></div>'
    }]
  }
});

let back = new Vue({
  el: '#backBtn',
  data: {
    back: `<form action="../index.html" method="POST">
             <input type="submit" value="BACK" id="back" name="backcnt">
           </form>`
  },
});

let vr = new Vue({ // VR
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
    }
  },
});

let qr = new Vue({ // QR
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
        this.qrdisplay = 'disnone'
      }, 600)
      this.qrAni = 'none'
      this.qrImg = 'qrOut'
    }
  }
})
