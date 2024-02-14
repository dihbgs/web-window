type TouchAndMouseEvent = MouseEvent | TouchEvent;
const screenMargin = 25;

window.onload = () => {
  const windows = document.querySelectorAll(".window");
  const titlebars = document.querySelectorAll(".window-titlebar");

  windows.forEach((win, index) => {
    const titlebar = titlebars[index] as HTMLElement;

    titlebar?.addEventListener("mousedown", handleEventStart, {
      passive: false,
    });

    titlebar?.addEventListener("touchstart", handleEventStart, {
      passive: false,
    });
  });

  const fields = document.querySelectorAll(".display");

  fields.forEach((field) => {
    field.addEventListener("click", (clickEvent) => {
      const target = clickEvent.target as HTMLElement;
      const targetClassList = target.closest(".display")
        ?.classList as DOMTokenList;
      const siblingClassList = target.closest(".display")?.nextElementSibling
        ?.classList as DOMTokenList;

      targetClassList.toggle("hidden");
      siblingClassList.toggle("hidden");

      targetClassList.toggle("show");
      siblingClassList.toggle("show");
    });
  });
};

function handleEventStart(event: TouchAndMouseEvent) {
  const target = (
    event instanceof MouseEvent ? event.target : event.touches[0].target
  ) as HTMLElement;
  const window = target?.closest(".window") as HTMLElement;

  const [windowX, windowY] = getWindowCoordinates(window);
  const [targetX, targetY] = getTargetCoordinates(event);

  const abortMovement = new AbortController();

  const offsetX = targetX - windowX!;
  const offsetY = targetY - windowY!;

  document.addEventListener(
    "mousemove",
    (mouseEvent) => {
      handleEventMove(mouseEvent, window, offsetX, offsetY);
    },
    {
      passive: false,
      signal: abortMovement.signal,
    }
  );

  document.addEventListener(
    "touchmove",
    (touchEvent) => {
      handleEventMove(touchEvent, window, offsetX, offsetY);
    },
    {
      passive: false,
      signal: abortMovement.signal,
    }
  );

  document.addEventListener(
    "mouseup",
    () => {
      checkOutOfBounds(window);
      abortMovement.abort();
    },
    {
      passive: false,
      signal: abortMovement.signal,
    }
  );

  document.addEventListener(
    "touchend",
    () => {
      checkOutOfBounds(window);
      abortMovement.abort();
    },
    {
      passive: false,
      signal: abortMovement.signal,
    }
  );

  event.preventDefault();
  rearrangeZIndex(target as HTMLElement);
}

function rearrangeZIndex(target: EventTarget | null) {
  const windows = document.querySelectorAll(".window");

  windows.forEach((window) => {
    (window as HTMLElement).style.zIndex = "0";
  });

  (target as HTMLElement).parentElement!.style.zIndex = "100";
}

function checkOutOfBounds(window: HTMLElement | null) {
  const [windowX, windowY] = getWindowCoordinates(window);
  const [screenW, screenH] = [screen.width, screen.height];
  window = window as HTMLElement;

  const isOutOfBounds =
    windowX! + screenMargin < 0 ||
    windowY! + screenMargin < 0 ||
    windowX! + window!.clientWidth > screenW + screenMargin ||
    windowY! + window!.clientHeight > screenH + screenMargin;

  if (isOutOfBounds) {
    window.style.position = "static";
  }
}

function handleEventMove(
  event: TouchAndMouseEvent,
  window: HTMLElement | null,
  offsetX: number,
  offsetY: number
) {
  const [targetX, targetY] = getTargetCoordinates(event);
  const left = targetX - offsetX;
  const top = targetY - offsetY;

  (window as HTMLElement).style.position = "absolute";
  (window as HTMLElement).style.left = `${left}px`;
  (window as HTMLElement).style.top = `${top}px`;
}

function getTargetCoordinates(event: TouchAndMouseEvent) {
  let targetX: number;
  let targetY: number;

  if (event instanceof MouseEvent) {
    targetX = event.clientX;
    targetY = event.clientY;
  } else {
    targetX = event.touches[0].clientX;
    targetY = event.touches[0].clientY;
  }

  return [targetX, targetY];
}

function getWindowCoordinates(window: Element | null) {
  const windowX = window?.getBoundingClientRect().left;
  const windowY = window?.getBoundingClientRect().top;

  return [windowX, windowY];
}
