let popup = document.querySelector(".popup");
let editBtn = document.querySelector(".profile__edit-btn");
let closeBtn = popup.querySelector(".popup__close");
function openPopup() {
  popup.classList.remove("popup");
  popup.classList.add("popup_opened");
}
function closePopup() {
  popup.classList.remove("popup_opened");
  popup.classList.add("popup");
}
editBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);
let nombre = document.querySelector(".profile__name");
let campoNombre = document.getElementById("nombre");
campoNombre.value = nombre.textContent;
let about = document.querySelector(".profile__ocp");
let campoAbout = document.getElementById("about");
campoAbout.value = about.textContent;

campoNombre.addEventListener("input", (nombre.textContent = campoNombre.value));
campoAbout.addEventListener("input", (about.textContent = campoAbout.value));

let formBtn = document.querySelector(".popup__btn");
function handleProfileInfoSubmit(evt) {
  evt.preventDefault();
}
formBtn.addEventListener("submit", handleProfileInfoSubmit);
