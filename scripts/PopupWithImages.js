import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".image-overlay__image");
    this._caption = this._popup.querySelector(".image-overlay__caption");
    this._closeBtn = this._popup.querySelector(".image-overlay__close");
  }

  open({ src, alt, caption }) {
    if (this._image && this._caption) {
      this._image.src = src;
      this._image.alt = alt || "";
      this._caption.textContent = caption || "";
    }
    super.open();
  }

  setEventListeners() {
    if (this._closeBtn) {
      this._closeBtn.addEventListener("click", () => this.close());
    }
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
    document.addEventListener("keydown", (evt) => {
      if (
        evt.key === "Escape" &&
        this._popup.classList.contains("image-overlay_opened")
      ) {
        this.close();
      }
    });
  }
}

export default PopupWithImage;
