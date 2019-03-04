// 惑星
class planet {
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

// リング
class ring {
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

// 雲
class crowd {
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
    title1: '',
    title2: '',
    title3: '',
    title4: '',
    text1: '',
    text2: '',
    text3: '',
    text4: '',
    text5: ''
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

let loadingBGWrap = new Vue({
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
    back: `<form action="../index.php" method="POST">
             <input type="submit" value="BACK" id="back" name="backcnt">
           </form>`
  },
})

window.location.hash = "#noback";
window.onhashchange = function () {
  window.location.hash = "#noback";
};
