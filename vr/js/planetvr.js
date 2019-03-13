document.addEventListener("DOMContentLoaded", function() {
  let planet = document.getElementById("planet");

  // 物体を回転させる
  let rotate = function(angle) {
    // 角度が360以上にならないように
    if (angle == 358) {
      angle = 0;
    } else {
      angle += 0.1;
    }
    // 次フレームの準備
    requestAnimationFrame(rotate.bind(null, angle));
    // 属性値を変更して回転させる
    planet.setAttribute("rotation", "0 " + angle + " 0");
  };
  rotate(0);
});

planet.addEventListener("click", function() {
  document.querySelector("a-text").setAttribute("opacity", "1");
});
planet.addEventListener("mouseleave", function() {
  document.querySelector("a-text").setAttribute("opacity", "0");
});
