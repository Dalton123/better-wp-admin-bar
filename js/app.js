window.addEventListener("load", () => {
  const adminBar = document.querySelector("#wpadminbar");
  adminBar.insertAdjacentHTML("beforeend", `<div class='wpadminbar-click-box'>Admin Bar</div>`);

  function removeWpStyleTag() {
    if (adminBar) {
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
    }
  }

  function toggleOpen(el) {
    document.querySelector(el).addEventListener("click", ({ target }) => {
      adminBar.classList.toggle("open");
    });
  }

  removeWpStyleTag();
});
