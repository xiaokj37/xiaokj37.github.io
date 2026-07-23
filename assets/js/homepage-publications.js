document.addEventListener("DOMContentLoaded", function () {
  var tabs = Array.prototype.slice.call(
    document.querySelectorAll("[data-publication-target]")
  );

  if (!tabs.length) return;

  function activateTab(tab, moveFocus) {
    tabs.forEach(function (candidate) {
      var panelId = candidate.getAttribute("data-publication-target");
      var panel = document.getElementById(panelId);
      var isActive = candidate === tab;

      candidate.classList.toggle("is-active", isActive);
      candidate.setAttribute("aria-selected", String(isActive));
      candidate.setAttribute("tabindex", isActive ? "0" : "-1");

      if (panel) {
        panel.hidden = !isActive;
      }
    });

    if (moveFocus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(tab, false);
    });

    tab.addEventListener("keydown", function (event) {
      var nextIndex;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });

  activateTab(tabs[0], false);
});
