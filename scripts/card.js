class Card {
  constructor(
    name,
    link,
    handleCardClick,
    templateSelector = "#card-template"
  ) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        if (typeof this._handleCardClick === "function") {
          this._handleCardClick(this._link, this._name);
        } else {
          this._handleImageClick();
        }
      });
  }

  _handleLikeClick() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _handleImageClick() {
    const overlay = document.getElementById("image-overlay");
    const overlayImage = overlay.querySelector(".image-overlay__image");
    const overlayCaption = overlay.querySelector(".image-overlay__caption");

    overlayImage.src = this._link;
    overlayImage.alt = this._name;
    overlayCaption.textContent = this._name;

    overlayImage.onload = () => {
      if (overlayImage.naturalWidth < 400 || overlayImage.naturalHeight < 300) {
        overlayImage.style.minWidth = "400px";
        overlayImage.style.minHeight = "300px";
        overlayImage.style.width = "auto";
        overlayImage.style.height = "auto";
      } else {
        overlayImage.style.minWidth = "";
        overlayImage.style.minHeight = "";
        overlayImage.style.width = "";
        overlayImage.style.height = "";
      }
    };

    overlay.classList.add("image-overlay_opened");
    console.log("Imagen abierta en overlay:", this._name);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    return this._element;
  }
}

function createCard(name, link, handleCardClick) {
  const card = new Card(name, link, handleCardClick);
  const cardElement = card.generateCard();
  // Manejo de error para imágenes rotas
  const img = cardElement.querySelector(".card__image");
  img.onerror = () => {
    img.src = "./images/placeholder.png"; // Usa una imagen de respaldo
  };
  return cardElement;
}

// Renderizar tarjetas iniciales
function renderInitialCards(handleCardClick) {
  const cardsContainer = document.querySelector(".cards");

  const card1 = new Card(
    "Valle de Yosemite",
    "./Images/elements1.jpg",
    handleCardClick
  );
  const card2 = new Card(
    "Lago Louise",
    "./Images/elements2.png",
    handleCardClick
  );
  const card3 = new Card(
    "Montañas Calvas",
    "./Images/montañas-calvas.png",
    handleCardClick
  );
  const card4 = new Card("Latemar", "./Images/elements3.png", handleCardClick);
  const card5 = new Card(
    "Parque Nacional de la Vanoise",
    "./Images/elements5.png",
    handleCardClick
  );
  const card6 = new Card(
    "Lago di Braies",
    "./Images/elements6.png",
    handleCardClick
  );

  cardsContainer.appendChild(card1.generateCard());
  cardsContainer.appendChild(card2.generateCard());
  cardsContainer.appendChild(card3.generateCard());
  cardsContainer.appendChild(card4.generateCard());
  cardsContainer.appendChild(card5.generateCard());
  cardsContainer.appendChild(card6.generateCard());
}

export default Card;
export { createCard, renderInitialCards };
