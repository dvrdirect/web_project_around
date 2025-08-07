import { FormValidator } from "./formvalidator.js";
import { openPopup, closePopup } from "./utils.js";
import Card, { createCard, renderInitialCards } from "./card.js";

// Configuración de validación
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

// Inicializar aplicación
document.addEventListener("DOMContentLoaded", () => {
  renderInitialCards();
  setupImageOverlay();

  setTimeout(() => {
    console.log("Inicializando validadores...");

    const profilePopup = document.getElementById("profile-popup");
    console.log("Profile popup found:", profilePopup);
    if (profilePopup) {
      const profileForm = profilePopup.querySelector(".popup__form");
      console.log("Profile form found:", profileForm);
      const profileValidator = new FormValidator(profileForm, validationConfig);
      profileValidator.enableValidation();
      console.log("Profile validator initialized");

      setupProfileSave(profileForm, profilePopup);
    }

    const cardPopup = document.getElementById("card-popup");
    console.log("Card popup found:", cardPopup);
    if (cardPopup) {
      const cardForm = cardPopup.querySelector(".popup__form");
      console.log("Card form found:", cardForm);
      console.log("Card inputs:", cardForm.querySelectorAll(".popup__input"));
      const cardValidator = new FormValidator(cardForm, validationConfig);
      cardValidator.enableValidation();
      console.log("Card validator initialized");

      setupCardSave(cardForm, cardPopup);
    }
  }, 100);
});

function setupImageOverlay() {
  const overlay = document.getElementById("image-overlay");
  const closeButton = overlay.querySelector(".image-overlay__close");

  closeButton.addEventListener("click", () => {
    overlay.classList.remove("image-overlay_opened");
  });

  overlay.addEventListener("click", (evt) => {
    if (evt.target === overlay) {
      overlay.classList.remove("image-overlay_opened");
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (
      evt.key === "Escape" &&
      overlay.classList.contains("image-overlay_opened")
    ) {
      overlay.classList.remove("image-overlay_opened");
    }
  });
}

function setupProfileSave(profileForm, profilePopup) {
  profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const nameInput = profileForm.querySelector('input[name="name"]');
    const descriptionInput = profileForm.querySelector(
      'input[name="description"]'
    );

    const newName = nameInput.value.trim();
    const newDescription = descriptionInput.value.trim();

    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(".profile__description");

    if (profileName && newName) {
      profileName.textContent = newName;
    }

    if (profileDescription && newDescription) {
      profileDescription.textContent = newDescription;
    }

    closePopup(profilePopup);

    console.log("Perfil actualizado:", {
      name: newName,
      description: newDescription,
    });
  });
}

function setupCardSave(cardForm, cardPopup) {
  cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const titleInput = cardForm.querySelector('input[name="title"]');
    const linkInput = cardForm.querySelector('input[name="link"]');

    const cardName = titleInput.value.trim();
    const cardLink = linkInput.value.trim();

    const newCard = new Card(cardName, cardLink);
    const cardElement = newCard.generateCard();

    const cardsContainer = document.querySelector(".cards");
    cardsContainer.prepend(cardElement);

    closePopup(cardPopup);

    console.log("Nueva tarjeta agregada:", { name: cardName, link: cardLink });
  });
}
