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

window.addEventListener('keydown', Keydown);

function Keydown(event) {
  let keycode = event.keyCode;

  //ページ以降
  if (keycode == 39) {
    if (!$('.infotext1').hasClass('none')) {
      $('.infotext2').removeClass('none');
      $('.infotext1').addClass('none');
      $('.next').addClass('none');
      $('.prev').removeClass('none');
    }
  } else if (keycode == 37) {
    if ($('.infotext1').hasClass('none')) {
      $('.infotext1').removeClass('none');
      $('.infotext2').addClass('none');
      $('.prev').addClass('none');
      $('.next').removeClass('none');
    }
  }
};

$(function () {
  $('.prev').click(function () {
    $('.infotext1').removeClass('none');
    $('.infotext2').addClass('none');
    $('.prev').addClass('none');
    $('.next').removeClass('none');
  });
  $('.next').click(function () {
    $('.infotext2').removeClass('none');
    $('.infotext1').addClass('none');
    $('.next').addClass('none');
    $('.prev').removeClass('none');
  });
});

history.pushState(null, null, null);
$(window).on('popstate', function (event) {
  if (!event.originalEvent.state) {
    history.pushState(null, null, null);
    return;
  }
});
