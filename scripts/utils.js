function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.style.visibility = "hidden";
  popup.style.opacity = "0";
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
}

function createPopup(popupId, title) {
  const template = document.getElementById("popup-template");
  const popupClone = template.content.cloneNode(true);

  const popup = popupClone.querySelector(".popup");
  popup.id = popupId;

  const titleElement = popupClone.querySelector(".popup__title");
  titleElement.textContent = title;

  if (popupId === "card-popup") {
    const nameInput = popupClone.querySelector(".popup__input--name");
    const descriptionInput = popupClone.querySelector(
      ".popup__input--description"
    );

    nameInput.placeholder = "Título";
    nameInput.name = "title";
    nameInput.classList.remove("popup__input--name");
    nameInput.classList.add("popup__input--title");

    descriptionInput.type = "url";
    descriptionInput.placeholder = "Enlace a la imagen";
    descriptionInput.name = "link";
    descriptionInput.classList.remove("popup__input--description");
    descriptionInput.classList.add("popup__input--link");
    descriptionInput.setAttribute("minlength", "1");
    descriptionInput.removeAttribute("maxlength");

    const nameError = popupClone.querySelector("#name-error");
    const descriptionError = popupClone.querySelector("#description-error");
    nameError.id = "title-error";
    descriptionError.id = "link-error";
  }

  document.body.appendChild(popupClone);

  return document.getElementById(popupId);
}

function initializePopups() {
  const profilePopup = createPopup("profile-popup", "Editar perfil");
  const cardPopup = createPopup("card-popup", "Nuevo lugar");

  return { profilePopup, cardPopup };
}

function clearForm(popup) {
  const inputs = popup.querySelectorAll(".popup__input");
  const errors = popup.querySelectorAll(".popup__error");
  const submitButton = popup.querySelector(".popup__submit");

  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("popup__input_error");
  });

  errors.forEach((error) => {
    error.textContent = "";
    error.classList.remove("popup__error_visible");
  });

  if (submitButton) {
    submitButton.classList.add("popup__submit_disabled");
    submitButton.disabled = true;
  }
}

function setupPopupEvents() {
  const { profilePopup, cardPopup } = initializePopups();

  const editButton = document.querySelector(".profile__button--edit");
  const addButton = document.querySelector(".profile__button--add");

  if (editButton) {
    editButton.addEventListener("click", () => {
      clearForm(profilePopup);
      openPopup(profilePopup);
    });
  }

  if (addButton) {
    addButton.addEventListener("click", () => {
      clearForm(cardPopup);
      openPopup(cardPopup);
    });
  }

  setupCloseEvents(profilePopup);
  setupCloseEvents(cardPopup);
}

function setupCloseEvents(popup) {
  const closeButton = popup.querySelector(".popup__close");

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closePopup(popup);
    });
  }

  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      const openPopups = document.querySelectorAll(".popup.popup_opened");
      openPopups.forEach((openPopup) => closePopup(openPopup));
    }
  });
}

// Inicializar eventos
document.addEventListener("DOMContentLoaded", setupPopupEvents);

export {
  openPopup,
  closePopup,
  setupPopupEvents,
  createPopup,
  initializePopups,
  clearForm,
};
