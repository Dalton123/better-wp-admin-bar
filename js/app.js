function setCookie(name, value, daysToLive) {
  var cookie = name + "=" + encodeURIComponent(value);
  if (typeof daysToLive === "number") {
    cookie += "; max-age=" + daysToLive * 24 * 60 * 60;
    document.cookie = cookie;
  }
}

function getCookie(name) {
  var cookieArr = document.cookie.split(";");
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if (name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

function drag() {
  let setCookieTimer;
  const clickBox = document.querySelector("#wpadminbar .wpadminbar-click-box");
  let cookieCheck = getCookie("wp_admin_bar_position");
  if (cookieCheck) clickBox.style.left = getCookie("wp_admin_bar_position");

  // when the user clicks down on the element
  clickBox.addEventListener("mousedown", function (e) {
    e.preventDefault();

    document.addEventListener("mousemove", mouseMove);

    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", mouseMove);
    });
  });

  function mouseMove(e) {
    clearTimeout(setCookieTimer);

    mouseXPos = e.clientX;

    posAsPercentage = Math.ceil((mouseXPos / window.innerWidth) * 100);

    // Limit position to 90% so it doesn't go off the screen
    posAsPercentage = posAsPercentage > 90 ? 90 : posAsPercentage;

    clickBox.style.position = "absolute";
    clickBox.style.left = `${posAsPercentage}%`;

    setCookieTimer = setTimeout(() => {
      setCookie("wp_admin_bar_position", `${posAsPercentage}%`, 30);
    }, 1000);
  }
}

window.addEventListener("load", () => {
  const adminBar = document.querySelector("#wpadminbar");

  if (adminBar) {
    improveAdminBar(adminBar);
    drag();
  }

  function improveAdminBar(adminBar) {
    const head = document.querySelector("head");
    const styleTags = head.querySelectorAll("style");
    styleTags.forEach((styleTag) => {
      if (
        styleTag.textContent.includes("html { margin-top: 32px !important; }")
      ) {
        styleTag.remove();
      }
    });
    toggleOpen("#wpadminbar, .wpadminbar-click-box");

    adminBar.insertAdjacentHTML(
      "beforeend",
      `<div class='wpadminbar-click-box'>Admin Bar</div>`
    );
  }

  function toggleOpen(el) {
    document.querySelector(el).addEventListener("click", () => {
      adminBar.classList.toggle("open");
    });
  }
});
