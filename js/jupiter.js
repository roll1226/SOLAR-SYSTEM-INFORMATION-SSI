initLoadingAnimation();

window.addEventListener('load', function () {
  const jupiterPlanet = new planet('../images/jupiter.jpg', 50, 20, 20);
  const { scene, camera, controls, renderer } = createPlanetScene();

  const jupiterMesh = new THREE.Mesh(jupiterPlanet.Geometry, jupiterPlanet.Material);
  scene.add(jupiterMesh);

  startRenderLoop(scene, camera, controls, renderer, function () {
    jupiterMesh.rotation.y += 0.005;
  });
});

new Vue({
  el: '#planetloadWrap',
  data: {
    jupiter: [
      { text: '<p class="text text1">木</p>' },
      { text: '<p class="text text3">星</p>' }
    ]
  }
});

new Vue({
  el: '#maintitle',
  data: { maintitle: '<h1>木星/JUPITER</h1>' }
});

// 1ページ目
planetVue.page1 = `<div class="title">
                     <h2>
                       木星の特徴
                     </h2>
                   </div>
                   <div id="jupiterimg1">
                     <p>
                       <img src="../images/planet/jupiter.jpg" alt="木星情報">太陽系の惑星の中で、一番大きな惑星。木星は太陽と同じ水素とヘリウムガスで出来ているため、見た目より軽い。木星が今の約100倍大きければ、内部で反応が起こり、太陽のようになっていたかもしれない。木星には大赤斑があり。自転スピードのはやさと大気や雲が、はげしく動いているためにできるもの。1830年に観測が始まってから一度も消滅したことがない。
                     </p>
                   </div>
                   <div class="clear"></div>

                   <div class="title">
                     <h2>
                       非常に淡い環
                     </h2>
                   </div>
                   <div id="jupiterimg2">
                     <p>
                       <img src="../images/planet/jupiter1.jpg" alt="木星の環">木星にも環がある。しかし、その環は非常に淡くて細く、木星の明るさですら邪魔になって見えなくなってしまうほど。木星の環は大きさが数μmほどしかない岩石の粒子でできており、衛星イオの火山の噴出物が起源であると考えられている。
                     </p>
                   </div>`

// 2ページ目
planetVue.page2 = `<div class="title">
                     <h2>
                       太陽系最大の磁気圏
                     </h2>
                   </div>
                   <div>
                     <p>
                       木星は非常に強い固有磁場があり、木星の周囲には強大な磁気圏が発達している。磁気圏では、地球からも観測される強い木星電波を発生している。
                       <br>
                       地球と同様、木星でも両極にオーロラが発生する。また、衛星のイオから発生したイオンが木星の大気に衝突する箇所では発光現象が観られる。
                     </p>
                   </div>

                   <div class="title">
                     <h2>
                       ソーラー電力セイルで木星へ
                     </h2>
                   </div>
                   <div id="jupiterimg3">
                     <p>
                       <img src="../images/planet/solarsail.jpg" alt="ソーラーセイル">日本では、ソーラー電力セイルという新しい技術を使った探査機で木星を目指す計画が検討されている。ソーラー電力セイルとは、太陽の光からの電力でイオンエンジンをはたらかせて進む宇宙船と光圧を利用したソーラーセイルとを組み合わせたもの。この計画では6年かけて木星に到着し、木星を周回して外側から観測したり木星の大気へ突入して大気を観測したりする予定である。
                     </p>
                   </div>`

// QRコード
qr.planet   = 'jupiter';
qr.planetQR = '木星QRコード';
