import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._form = this._popup.querySelector(".popup__form");
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (typeof this._handleConfirm === "function") {
          this._handleConfirm();
        }
      });
    }
  }

  open(onConfirm) {
    this._handleConfirm = onConfirm;
    super.open();
  }
}

export default PopupWithConfirmation;
