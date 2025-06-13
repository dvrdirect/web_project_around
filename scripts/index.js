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

let profileName = document.querySelector("#profile-name");
let profileOcp = document.querySelector("#profile-ocupation");

let formElement = document.querySelector("#formulario");

function profileSubmit(evt) {
  evt.preventDefault();
  let inputName = document.querySelector("#nombre");
  let inputOcp = document.querySelector("#about");

  profileName.textContent = inputName.value;
  profileOcp.textContent = inputOcp.value;
}

formElement.addEventListener("submit", profileSubmit);
formElement.addEventListener("submit", closePopup);
