document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("page-enter");

  window.addEventListener("beforeunload", function () {
    document.body.classList.add("page-exit");
  });

  window.addEventListener("popstate", function () {
    document.body.classList.remove("page-enter");
    document.body.classList.add("page-enter");
  });
});

window.addEventListener("load", function () {
  document.getElementById("loadingScreen").style.display = "none";
  document
    .querySelector("body")
    .removeChild(document.getElementById("loadingScreen"));
});
