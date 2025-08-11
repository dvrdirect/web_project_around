class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    if (this._popup) {
      this._popup.classList.add("popup_opened");
      document.addEventListener("keydown", this._handleEscClose);
    }
  }

  close() {
    if (this._popup) {
      this._popup.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    if (!this._popup) return;
    // Cerrar al hacer click en el botón de cerrar
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
}

export default Popup;
