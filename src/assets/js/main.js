import "../css/main.scss";

const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds
const MOUSE_MOVE_DELAY = 1000; // 1 second
const MAX_POS_PERCENTAGE = 90;

function setCookie(name, value, daysToLive) {
  let cookie = `${name}=${encodeURIComponent(value)}`;
  if (typeof daysToLive === "number") {
    cookie += `; max-age=${daysToLive}`;
    document.cookie = cookie;
  }
}

function getCookie(name) {
  const cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

window.addEventListener("load", () => {
  const adminBar = document.querySelector("#wpadminbar");

  if (adminBar) {
    improveAdminBar(adminBar);
    const clickBox = adminBar.querySelector(".wpadminbar-click-box");
    if (clickBox) {
      drag(clickBox);
    }
  }

  function improveAdminBar(adminBar) {
    const head = document.querySelector("head");
    const styleTags = head.querySelectorAll("style");
    styleTags.forEach((styleTag) => {
      if (styleTag.textContent.includes("html { margin-top: 32px !important; }")) {
        styleTag.remove();
      }
    });

    adminBar.insertAdjacentHTML(
      "beforeend",
      `<div class='wpadminbar-click-box'>Admin Bar</div>`
    );
    
    toggleOpen(adminBar, ".wpadminbar-click-box");
  }

  function toggleOpen(element, selector) {
    element.querySelector(selector).addEventListener("click", () => {
      adminBar.classList.toggle("open");
    });
  }

  function drag(clickBox) {
    let setCookieTimer;
    let cookieCheck = getCookie("wp_admin_bar_position");
    if (cookieCheck) clickBox.style.left = cookieCheck;

    clickBox.addEventListener("mousedown", (e) => {
      e.preventDefault();
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", mouseMove);
      });
    });

    function mouseMove(e) {
      clearTimeout(setCookieTimer);
      let mouseXPos = e.clientX;
      let posAsPercentage = Math.ceil((mouseXPos / window.innerWidth) * 100);

      posAsPercentage = posAsPercentage > MAX_POS_PERCENTAGE ? MAX_POS_PERCENTAGE : posAsPercentage;

      clickBox.style.position = "absolute";
      clickBox.style.left = `${posAsPercentage}%`;

      setCookieTimer = setTimeout(() => {
        setCookie("wp_admin_bar_position", `${posAsPercentage}%`, COOKIE_MAX_AGE);
      }, MOUSE_MOVE_DELAY);
    }
  }
});
