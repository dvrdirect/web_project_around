import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll("input"));
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    if (!this._popup) return;
    // Evento submit del formulario
    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
    // Evento click en el botón de cerrar
    const closeBtn = this._popup.querySelector(".popup__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }
    // Cerrar al hacer click en el área sombreada
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }

  close() {
    super.close();
    if (this._form) {
      this._form.reset();
    }
  }
}

export default PopupWithForm;
