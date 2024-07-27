document.addEventListener("DOMContentLoaded", function () {
  let isInitialLoad = true;

  function handlePageTransition(isBack = false) {
    if (isInitialLoad) {
      document.body.classList.add("page-enter");
      isInitialLoad = false;
    } else {
      document.body.classList.remove("page-enter", "page-exit");
      void document.body.offsetWidth;
      document.body.classList.add(isBack ? "page-enter-back" : "page-enter");
    }
  }

  handlePageTransition();

  window.addEventListener("popstate", function () {
    handlePageTransition(true);
  });

  window.addEventListener("beforeunload", function () {
    document.body.classList.add("page-exit");
  });

  document.addEventListener("click", function (e) {
    if (
      e.target.tagName === "A" &&
      e.target.origin === window.location.origin
    ) {
      e.preventDefault();
      document.body.classList.add("page-exit");
      setTimeout(() => {
        window.location.href = e.target.href;
      }, 300);
    }
  });
});

window.addEventListener("load", function () {
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";

    document
      .querySelector("body")
      .removeChild(document.getElementById("loadingScreen"));

    document.body.style.overflow = "auto";
  }, 1000);
});
