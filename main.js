import "./style.css";

function disableScroll() {
  let scrollTop = window.scrollY;
  let scrollLeft = window.scrollX;
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

function enableScroll() {
  window.onscroll = undefined;
}

const hideBtn = document.querySelector("#modalHide");

let init = true;

const showModal = () => {
  if (window.scrollY > 30 && !document.body.classList.contains("show-modal")) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    document.body.classList.add("show-modal");
    document.querySelector(".modal-content__wrapper");
    document.querySelector(".modal-content__wrapper").classList.add("active");
    document
      .querySelector(".modal-content__wrapper")
      .addEventListener("animationstart", (e) => {
        window.scrollTo({ top: 0 });
        disableScroll();
      });
    document
      .querySelector(".modal-content__wrapper")
      .addEventListener("animationend", (e) => {
        enableScroll();
      });
    document.querySelector(".modal").classList.toggle("h110");
  }
};

const hideModal = () => {
  init = false;
  const active = document.querySelector(".modal-content__wrapper.active");
  active.classList.add("reverse");

  active.addEventListener("animationend", (e) => {
    document.body.classList.remove("show-modal");
  });
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  document.removeEventListener("scroll", showModal);
};

if (init) {
  document.addEventListener("scroll", showModal);
  hideBtn.addEventListener("click", hideModal);
}
