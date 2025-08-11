import { FormValidator } from "./formvalidator.js";
import Card, { createCard, renderInitialCards } from "./card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImages.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

document.addEventListener("DOMContentLoaded", () => {
  // Instancia UserInfo
  const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__description",
  });

  // Instancia PopupWithImage
  const imagePopup = new PopupWithImage("#image-overlay");
  imagePopup.setEventListeners();

  // Función para abrir imagen en popup
  function handleCardClick(link, name) {
    imagePopup.open({ src: link, alt: name, caption: name });
  }

  // Instancia Section para las tarjetas
  const initialCards = [
    { name: "Valle de Yosemite", link: "./Images/elements1.jpg" },
    { name: "Lago Louise", link: "./Images/elements2.png" },
    { name: "Montañas Calvas", link: "./Images/montañas-calvas.png" },
    { name: "Latemar", link: "./Images/elements3.png" },
    { name: "Parque Nacional de la Vanoise", link: "./Images/elements5.png" },
    { name: "Lago di Braies", link: "./Images/elements6.png" },
  ];

  const cardSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const cardElement = createCard(item.name, item.link, handleCardClick);
        cardSection.addItem(cardElement);
      },
    },
    ".cards"
  );
  cardSection.render();

  // Instancia PopupWithForm para perfil
  const profilePopupWithForm = new PopupWithForm(
    "#profile-popup",
    (formData) => {
      userInfo.setUserInfo({ name: formData.name, job: formData.description });
      profilePopupWithForm.close();
    }
  );
  profilePopupWithForm.setEventListeners();

  // Instancia PopupWithForm para tarjetas
  const cardPopupWithForm = new PopupWithForm("#card-popup", (formData) => {
    const cardElement = createCard(
      formData.title,
      formData.link,
      handleCardClick
    );
    cardSection.addItem(cardElement);
    cardPopupWithForm.close();
  });
  cardPopupWithForm.setEventListeners();

  // Validación de formularios
  const profileForm = document.querySelector("#profile-popup .popup__form");
  if (profileForm) {
    const profileValidator = new FormValidator(profileForm, validationConfig);
    profileValidator.enableValidation();
  }
  const cardForm = document.querySelector("#card-popup .popup__form");
  if (cardForm) {
    const cardValidator = new FormValidator(cardForm, validationConfig);
    cardValidator.enableValidation();
  }

  // Abrir popups con botones
  document
    .querySelector(".profile__button--edit")
    .addEventListener("click", () => {
      profileForm.querySelector('input[name="name"]').value = "";
      profileForm.querySelector('input[name="description"]').value = "";
      profilePopupWithForm.open();
    });

  document
    .querySelector(".profile__button--add")
    .addEventListener("click", () => {
      cardPopupWithForm.open();
    });
});
