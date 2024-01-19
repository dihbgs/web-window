var screenMargin = 25;
window.onload = function () {
    var windows = document.querySelectorAll(".window");
    var titlebars = document.querySelectorAll(".window-titlebar");
    windows.forEach(function (win, index) {
        var titlebar = titlebars[index];
        titlebar === null || titlebar === void 0 ? void 0 : titlebar.addEventListener("mousedown", handleEventStart, {
            passive: false,
        });
        titlebar === null || titlebar === void 0 ? void 0 : titlebar.addEventListener("touchstart", handleEventStart, {
            passive: false,
        });
    });
};
function handleEventStart(event) {
    var target = (event instanceof MouseEvent ? event.target : event.touches[0].target);
    var window = target === null || target === void 0 ? void 0 : target.closest(".window");
    var _a = getWindowCoordinates(window), windowX = _a[0], windowY = _a[1];
    var _b = getTargetCoordinates(event), targetX = _b[0], targetY = _b[1];
    var abortMovement = new AbortController();
    var offsetX = targetX - windowX;
    var offsetY = targetY - windowY;
    document.addEventListener("mousemove", function (mouseEvent) {
        handleEventMove(mouseEvent, window, offsetX, offsetY);
    }, {
        passive: false,
        signal: abortMovement.signal,
    });
    document.addEventListener("touchmove", function (touchEvent) {
        handleEventMove(touchEvent, window, offsetX, offsetY);
    }, {
        passive: false,
        signal: abortMovement.signal,
    });
    document.addEventListener("mouseup", function () {
        checkOutOfBounds(window);
        abortMovement.abort();
    }, {
        passive: false,
        signal: abortMovement.signal,
    });
    document.addEventListener("touchend", function () {
        checkOutOfBounds(window);
        abortMovement.abort();
    }, {
        passive: false,
        signal: abortMovement.signal,
    });
    event.preventDefault();
    rearrangeZIndex(target);
}
function rearrangeZIndex(target) {
    var windows = document.querySelectorAll(".window");
    windows.forEach(function (window) {
        window.style.zIndex = "0";
    });
    target.parentElement.style.zIndex = "100";
}
function checkOutOfBounds(window) {
    var _a = getWindowCoordinates(window), windowX = _a[0], windowY = _a[1];
    var _b = [screen.width, screen.height], screenW = _b[0], screenH = _b[1];
    window = window;
    var isOutOfBounds = windowX + screenMargin < 0 ||
        windowY + screenMargin < 0 ||
        windowX + window.clientWidth > screenW + screenMargin ||
        windowY + window.clientHeight > screenH + screenMargin;
    if (isOutOfBounds) {
        window.style.position = "static";
    }
}
function handleEventMove(event, window, offsetX, offsetY) {
    var _a = getTargetCoordinates(event), targetX = _a[0], targetY = _a[1];
    var left = targetX - offsetX;
    var top = targetY - offsetY;
    window.style.position = "absolute";
    window.style.left = "".concat(left, "px");
    window.style.top = "".concat(top, "px");
}
function getTargetCoordinates(event) {
    var targetX;
    var targetY;
    if (event instanceof MouseEvent) {
        targetX = event.clientX;
        targetY = event.clientY;
    }
    else {
        targetX = event.touches[0].clientX;
        targetY = event.touches[0].clientY;
    }
    return [targetX, targetY];
}
function getWindowCoordinates(window) {
    var windowX = window === null || window === void 0 ? void 0 : window.getBoundingClientRect().left;
    var windowY = window === null || window === void 0 ? void 0 : window.getBoundingClientRect().top;
    return [windowX, windowY];
}
