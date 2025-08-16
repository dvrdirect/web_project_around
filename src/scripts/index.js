import { FormValidator } from "./formvalidator.js";
import Card, { createCard, renderInitialCards } from "./card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImages.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import Api from "./Api.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

// Instancia de la clase Api
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: "08ed277f-df6d-4b03-a7d6-678e30cfc3af",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  // Función para agregar una nueva tarjeta usando la API
  function addNewCard(formData, callback) {
    api
      .addCard({ name: formData.title, link: formData.link })
      .then((card) => callback(card))
      .catch(() => callback(null));
  }
  // Instancia Section para las tarjetas
  const cardSection = new Section(
    {
      items: [],
      renderer: function (cardData) {
        const cardElement = createCardWithLike(cardData, handleCardClick);
        this.addItem(cardElement);
      },
    },
    ".cards"
  );
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
  api
    .getAppData()
    .then(function ([userData, cards]) {
      console.log("Tarjetas recibidas de la API:", cards);
      console.log(
        "Cantidad de tarjetas:",
        Array.isArray(cards) ? cards.length : cards
      );
      userInfo.setUserInfo({ name: userData.name, job: userData.about });
      const avatarImg = document.querySelector(".profile__avatar");
      if (avatarImg && userData.avatar) {
        avatarImg.src = userData.avatar;
        avatarImg.alt = userData.name + " avatar";
      }
      // Guarda el ID del usuario actual
      window.currentUserId = userData._id;
      window.isPersonalUser = userData._id === PERSONAL_USER_ID;
      // Renderiza tarjetas solo después de usuario
      cardSection._items = cards;
      cardSection._renderer = function (cardData) {
        const cardElement = createCardWithLike(cardData, handleCardClick);
        cardSection.addItem(cardElement);
      };
      cardSection.render();
    })
    .catch(function (err) {
      alert("Error al obtener datos de usuario o tarjetas");
    });

  // Instancia PopupWithForm para tarjetas
  const cardPopupWithForm = new PopupWithForm("#card-popup", function (
    formData
  ) {
    const cardForm = document.querySelector("#card-popup .popup__form");
    const submitBtn = cardForm.querySelector(".popup__submit");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Guardando...";
    submitBtn.disabled = true;
    addNewCard(formData, function (newCard) {
      if (newCard) {
        const cardElement = createCard(
          newCard.name,
          newCard.link,
          handleCardClick
        );
        cardSection.addItem(cardElement);
      }
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      cardPopupWithForm.close();
    });
  });
  cardPopupWithForm.setEventListeners();

  // Instancia PopupWithForm para perfil
  const profilePopupWithForm = new PopupWithForm("#profile-popup", function (
    formData
  ) {
    // Aquí puedes agregar la lógica para guardar los datos del perfil si lo deseas
    // Por ejemplo: api.setUserInfo(formData).then(...)
  });
  profilePopupWithForm.setEventListeners();

  // Instancia PopupWithForm para cambiar avatar
  const avatarPopupWithForm = new PopupWithForm("#avatar-popup", function (
    formData
  ) {
    // Aquí puedes agregar la lógica para guardar el nuevo avatar si lo deseas
    // Por ejemplo: api.setUserAvatar(formData).then(...)
  });
  avatarPopupWithForm.setEventListeners();

  // Abrir popup de avatar al hacer click en el ícono
  const editAvatarIcon = document.getElementById("edit-avatar-icon");
  if (editAvatarIcon) {
    editAvatarIcon.addEventListener("click", () => {
      avatarPopupWithForm.open();
    });
  }

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

  // ID personal
  const PERSONAL_USER_ID = "92c0535f1ccf9621ffdb9f02";
  // Instancia del popup de confirmación
  const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");
  deleteCardPopup.setEventListeners();
  let cardToDelete = null;

  function functionDeleteCard(cardElement, cardId) {
    cardToDelete = { element: cardElement, id: cardId };
    deleteCardPopup.open();
  }

  // Lógica para eliminar solo al submit del form de confirmación
  const deleteForm = document.querySelector("#delete-card-popup .popup__form");
  if (deleteForm) {
    deleteForm.addEventListener("submit", function (evt) {
      evt.preventDefault();
      if (!cardToDelete) return;
      api
        .deleteCard(cardToDelete.id)
        .then((res) => {
          cardToDelete.element.remove();
        })
        .catch((err) => {
          alert(
            "No se pudo eliminar la tarjeta de la API: " +
              (err?.message || JSON.stringify(err))
          );
        })
        .finally(() => {
          deleteCardPopup.close();
          cardToDelete = null;
        });
    });
  }

  function createCardWithLike(cardData, handleCardClick, handleLikeClick) {
    const cardElement = createCard(
      cardData.name,
      cardData.link,
      handleCardClick
    );
    cardElement.dataset.cardId = cardData._id;
    // Like visual
    let likeBtn = cardElement.querySelector(".card__like-button");
    let likeImg = likeBtn.querySelector("img");

    const isLiked =
      cardData.likes &&
      cardData.likes.some(function (liker) {
        return liker._id === window.currentUserId;
      });
    if (isLiked) {
      likeBtn.classList.add("card__like-button_active");
      if (likeImg) likeImg.src = "./images/llike-on.png";
    } else {
      likeBtn.classList.remove("card__like-button_active");
      if (likeImg) likeImg.src = "./images/like.png";
    }
    likeBtn.addEventListener("click", function () {
      toggleLike(
        cardData._id,
        likeBtn.classList.contains("card__like-button_active"),
        function (updatedCard) {
          if (updatedCard) {
            const liked = updatedCard.likes.some(function (liker) {
              return liker._id === window.currentUserId;
            });
            if (liked) {
              likeBtn.classList.add("card__like-button_active");
              if (likeImg) likeImg.src = "./images/llike-on.png";
            } else {
              likeBtn.classList.remove("card__like-button_active");
              if (likeImg) likeImg.src = "./images/like.png";
            }
          }
        }
      );
    });
    // Fallback: si no hay owner, asigna el usuario actual
    if (!cardData.owner) {
      cardData.owner = { _id: window.currentUserId };
    }
    // Botón de eliminar
    const deleteBtn = cardElement.querySelector(".card__delete-button");
    deleteBtn.style.display = "";
    deleteBtn.addEventListener("click", function () {
      functionDeleteCard(cardElement, cardData._id);
    });
    return cardElement;
  }
  // Cierra el event listener principal
});
