import "./style.css";

// function disableScroll() {
//   let scrollTop = window.scrollY;
//   let scrollLeft = window.scrollX;
//   window.onscroll = function () {
//     window.scrollTo(scrollLeft, scrollTop);
//   };
// }

// function enableScroll() {
//   window.onscroll = undefined;
// }

const hideBtn = document.querySelector("#modalHide");
const modal = document.querySelector(".modal");
let windowScollPos;

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
      });
    document
      .querySelector(".modal-content__wrapper")
      .addEventListener("animationend", (e) => {
        document.body.classList.add("section2");
      });
    document.querySelector(".modal").classList.toggle("h110");
  }
};

const moveBottom = () => {
  if (document.body.classList.contains("section2")) {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
    document.addEventListener(
      "scrollend",
      () => {
        windowScollPos = window.scrollY;

        document.body.classList.remove("section2");
        document.removeEventListener("scroll", showModal, { passive: true });
        document.removeEventListener("scroll", moveBottom, { passive: true });
        document.body.classList.add("section3");
        document.removeEventListener("scroll", moveBottom, { passive: true });
      },
      { passive: true }
    );
  }
};

const startHideModal = () => {
  if (document.body.classList.contains("section3")) {
    document.removeEventListener("scroll", moveBottom, { passive: true });
    if (window.scrollY + 10 < windowScollPos) {
      hideModal();
    }
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
  document.addEventListener("scroll", showModal, { passive: true });
  document.addEventListener("scroll", moveBottom, { passive: true });
  document.addEventListener("scroll", startHideModal, { passive: true });
  hideBtn.addEventListener("click", hideModal, { passive: true });
}

document.getElementById("bottom").addEventListener("click", () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth",
  });
});
