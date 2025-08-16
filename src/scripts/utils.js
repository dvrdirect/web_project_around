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

// initializePopups eliminado porque createPopup ya no existe

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

// setupPopupEvents modificado: ya no usa initializePopups ni createPopup
// Si necesitas lógica para popups, agrégala aquí usando los popups ya existentes en el HTML

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

export { openPopup, closePopup, setupPopupEvents, clearForm };
