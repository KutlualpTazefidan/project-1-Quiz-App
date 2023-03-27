// const bodyElement = document.querySelector();
const darkModeButton = document.querySelector(".main__darkmode-checkbox");
const headerElement = document.querySelector(".main-header");
const mainElement = document.querySelector(".main");
const footerElement = document.querySelector(".footer");
const statsButton = document.querySelectorAll(".main__stats-button");

darkModeButton.addEventListener("change", () => {
  headerElement.classList.add("transition-mode");
  footerElement.classList.add("transition-mode");
  mainElement.classList.add("transition-mode");
  headerElement.classList.toggle("black-dark-mode");
  footerElement.classList.toggle("black-dark-mode");
  mainElement.classList.toggle("grey-dark-mode");
  statsButton.forEach((button) => button.classList.toggle("grey-dark-mode"));

  console.log(darkModeButton.checked);
});
