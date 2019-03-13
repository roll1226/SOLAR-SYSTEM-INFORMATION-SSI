let sun = document.getElementById('sun');
let sunText = document.getElementById('sunText');
let mercury = document.getElementById('mercury');
let mercuryText = document.getElementById('mercuryText');
let venus = document.getElementById('venus');
let venusText = document.getElementById('venusText');
let earth = document.getElementById('earth');
let crowd = document.getElementById('crowd');
let earthText = document.getElementById('earthText');
let mars = document.getElementById('mars');
let marsText = document.getElementById('marsText');
let jupiter = document.getElementById('jupiter');
let jupiterText = document.getElementById('jupiterText');
let saturn = document.getElementById('saturn');
let saturnRing = document.getElementById('saturnRing');
let saturnText = document.getElementById('saturnText');
let uranus = document.getElementById('uranus');
let uranusRing = document.getElementById('uranusRing');
let uranusText = document.getElementById('uranusText');
let neptune = document.getElementById('neptune');
let neptuneText = document.getElementById('neptuneText');

// 太陽
sun.addEventListener('click', function () {
  sunText.setAttribute('animation__text', 'property: opacity; to: 1; dur: 700; easing: easeInCubic; loop: 1;');
});
sun.addEventListener('mouseleave', function () {
  sunText.setAttribute('animation__text', 'property: opacity; to: 0; dur: 500; easing: easeInCubic; loop: 1;');
});

// 水星
mercury.addEventListener('click', function () {
  mercuryText.setAttribute('animation__text', 'property: opacity; to: 1; dur: 700; easing: easeInCubic; loop: 1;');
});
mercury.addEventListener('mouseleave', function () {
  mercuryText.setAttribute('animation__text', 'property: opacity; to: 0; dur: 500; easing: easeInCubic; loop: 1;');
});

// 金星
venus.addEventListener('click', function () {
  venusText.setAttribute('animation__text', 'property: opacity; to: 1; dur: 700; easing: easeInCubic; loop: 1;');
});
venus.addEventListener('mouseleave', function () {
  venusText.setAttribute('animation__text', 'property: opacity; to: 0; dur: 500; easing: easeInCubic; loop: 1;');
});

// 地球
crowd.addEventListener('click', function () {
  earth.setAttribute('animation__event', 'property: scale; to: 1 1 1; dur: 700; easing: easeInCubic; loop: 1;');
  earthText.setAttribute('animation__text', 'property: opacity; to: 1; dur: 700; easing: easeInCubic; loop: 1;');
});
crowd.addEventListener('mouseleave', function () {
  earth.setAttribute('animation__event', 'property: scale; to: 0.8 0.8 0.8; dur: 500; easing: easeInCubic; loop: 1;');
  earthText.setAttribute('animation__text', 'property: opacity; to: 0; dur: 500; easing: easeInCubic; loop: 1;');
});

// 月
moon.addEventListener('click', function () {
  moonText.setAttribute('animation__text', 'property: opacity; to: 1; dur: 700; easing: easeInCubic; loop: 1;');
});
moon.addEventListener('mouseleave', function () {
  moonText.setAttribute('animation__text', 'property: opacity; to: 0; dur: 500; easing: easeInCubic; loop: 1;');
});

// 火星
mars.addEventListener('click', function () {
  marsText.setAttribute('animation__text', 'property: opacity; to: 1; dur: 700; easing: easeInCubic; loop: 1;');
});
mars.addEventListener('mouseleave', function () {
  marsText.setAttribute('animation__text', 'property: opacity; to: 0; dur: 500; easing: easeInCubic; loop: 1;');
});

// 木星
jupiter.addEventListener('click', function () {
  jupiterText.setAttribute('animation__text', 'property: opacity; to: 1; dur: 700; easing: easeInCubic; loop: 1;');
});
jupiter.addEventListener('mouseleave', function () {
  jupiterText.setAttribute('animation__text', 'property: opacity; to: 0; dur: 500; easing: easeInCubic; loop: 1;');
});

// 土星
saturn.addEventListener('click', function () {
  saturnRing.setAttribute('animation__event', 'property: scale; to: 1 1 1; dur: 700; easing: easeInCubic; loop: 1;');
  saturnText.setAttribute('animation__text', 'property: opacity; to: 1; dur: 700; easing: easeInCubic; loop: 1;');
});
saturn.addEventListener('mouseleave', function () {
  saturnRing.setAttribute('animation__event', 'property: scale; to: 0.8 0.8 0.8; dur: 500; easing: easeInCubic; loop: 1;');
  saturnText.setAttribute('animation__text', 'property: opacity; to: 0; dur: 500; easing: easeInCubic; loop: 1;');
});

// 天王星
uranus.addEventListener('click', function () {
  uranusRing.setAttribute('animation__event', 'property: scale; to: 1 1 1; dur: 700; easing: easeInCubic; loop: 1;');
  uranusText.setAttribute('animation__text', 'property: opacity; to: 1; dur: 700; easing: easeInCubic; loop: 1;');
});
uranus.addEventListener('mouseleave', function () {
  uranusRing.setAttribute('animation__event', 'property: scale; to: 0.8 0.8 0.8; dur: 500; easing: easeInCubic; loop: 1;');
  uranusText.setAttribute('animation__text', 'property: opacity; to: 0; dur: 500; easing: easeInCubic; loop: 1;');
});

// 海王星
neptune.addEventListener('click', function () {
  neptuneText.setAttribute('animation__text', 'property: opacity; to: 1; dur: 700; easing: easeInCubic; loop: 1;');
});
neptune.addEventListener('mouseleave', function () {
  neptuneText.setAttribute('animation__text', 'property: opacity; to: 0; dur: 500; easing: easeInCubic; loop: 1;');
});
