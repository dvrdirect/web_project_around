class FormValidator {
  constructor(form, settings) {
    this.form = form;
    this.settings = settings;
    this.inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    this.submitButton = form.querySelector(settings.submitButtonSelector);
    this.inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    let errorId;
    if (inputElement.name === "title") {
      errorId = "title-error";
    } else if (inputElement.name === "link") {
      errorId = "link-error";
    } else {
      errorId = `${inputElement.name}-error`;
    }

    const errorElement = this.form.querySelector(`#${errorId}`);
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.settings.errorClass);
    }
    inputElement.classList.add(this.settings.inputErrorClass);
  }

  _hideInputError(inputElement) {
    let errorId;
    if (inputElement.name === "title") {
      errorId = "title-error";
    } else if (inputElement.name === "link") {
      errorId = "link-error";
    } else {
      errorId = `${inputElement.name}-error`;
    }

    const errorElement = this.form.querySelector(`#${errorId}`);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this.settings.errorClass);
    }
    inputElement.classList.remove(this.settings.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    let isValid = inputElement.validity.valid;

    if (inputElement.type === "url" && inputElement.value.trim() !== "") {
      if (!inputElement.value.trim().startsWith("http")) {
        isValid = false;
      }
    }

    return isValid;
  }

  _isValid(inputElement) {
    let isValid = inputElement.validity.valid;
    let errorMessage = inputElement.validationMessage;

    if (inputElement.type === "url" && inputElement.value.trim() !== "") {
      if (!inputElement.value.trim().startsWith("http")) {
        isValid = false;
        errorMessage = "Por favor, ingresa una URL válida ";
      }
    }

    if (!isValid) {
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !this._checkInputValidity(inputElement);
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.submitButton.classList.add(this.settings.inactiveButtonClass);
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove(this.settings.inactiveButtonClass);
      this.submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

// Configuración de validación
const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

// Inicializar validación
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    console.log("Inicializando validadores...");

    // Crear instancia de FormValidator para el formulario de perfil
    const profileForm = document.querySelector("#profile-popup .popup__form");
    if (profileForm) {
      const profileValidator = new FormValidator(
        profileForm,
        validationSettings
      );
      profileValidator.enableValidation();
      console.log("Profile validator initialized");
    }

    // Crear instancia de FormValidator para el formulario de tarjetas
    const cardForm = document.querySelector("#card-popup .popup__form");
    if (cardForm) {
      const cardValidator = new FormValidator(cardForm, validationSettings);
      cardValidator.enableValidation();
      console.log("Card validator initialized");
    }
  }, 100);
});

export { FormValidator, validationSettings };
