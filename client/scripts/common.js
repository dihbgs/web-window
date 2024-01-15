window.onload = () => {
  const window = document.querySelectorAll(".window");

  for (let i = 0; i < window.length; i++) {
    const titlebar = document.querySelectorAll(".window-titlebar")[i];

    titlebar.addEventListener("mousedown", (event) => {
      moveWindow(event, window[i], titlebar);
    });

    titlebar.addEventListener("touchstart", (event) => {
      moveWindow(event, window[i], titlebar);
    });
  }
};

function moveWindow(event, window, titlebar) {
  titlebar.style.cursor = "grabbing";
  let shiftX = event.clientX - window.getBoundingClientRect().left;
  let shiftY = event.clientY - window.getBoundingClientRect().top;

  if (event.type === "touchstart") {
    shiftX = event.touches[0].clientX - window.getBoundingClientRect().left;
    shiftY = event.touches[0].clientY - window.getBoundingClientRect().top;

    window.addEventListener("touchmove", (event) => {
      moveAt(event.touches[0].clientX, event.touches[0].clientY);
    });
  }

  function moveAt(pageX, pageY) {
    window.style.position = "absolute";
    window.style.left = pageX - shiftX + "px";
    window.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  function zUp() {
    window.style.zIndex = 1;

    const z = document.querySelectorAll(".window");
    for (let i = 0; i < z.length; i++) {
      if (z[i] != window) {
        z[i].style.zIndex = 0;
      }
    }
  }

  document.addEventListener("mousemove", onMouseMove);

  window.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    titlebar.style.cursor = "grab";
    window.onmouseup = null;
  };

  window.ondragstart = function () {
    return false;
  };

  moveAt(event.pageX, event.pageY);
  zUp();
}
