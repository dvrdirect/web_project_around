const popupProfile = document.querySelector(".popup__overlay");

const zoomOverlay = document.querySelector(".elements__zoom-overlay");
const content = popupProfile.querySelector(".popup__form");
const editBtn = document.querySelector(".profile__edit-btn");
const closeBtn = popupProfile.querySelector(".popup__close");

function openPopupProfile() {
  popupProfile.classList.add("popup__overlay_active");
  const form = popupProfile.querySelector("form");
  isValid(form);
}

function closePopupProfile() {
  popupProfile.classList.remove("popup__overlay_active");
}

editBtn.addEventListener("click", openPopupProfile);
closeBtn.addEventListener("click", closePopupProfile);

// Esta es la única que necesitas
popupProfile.addEventListener("mousedown", (e) => {
  const form = popupProfile.querySelector(".popup__form");
  if (e.target === popupProfile && !form.contains(e.target)) {
    closePopupProfile();
  }
});

// Cambiar los datos de la profile-form
let profileName = document.querySelector("#profile-name");
let profileOcp = document.querySelector("#profile-ocupation");

let formElement = document.querySelector("#formulario");

function profileSubmit(evt) {
  evt.preventDefault();
  let inputName = document.querySelector("#nombre");
  let inputOcp = document.querySelector("#about");

  profileName.textContent = inputName.value;
  profileOcp.textContent = inputOcp.value;
}

formElement.addEventListener("submit", profileSubmit);
formElement.addEventListener("submit", closePopupProfile);

//Creación de tarjetas

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    gridArea: "elements-1",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
    gridArea: "elements-2",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    gridArea: "elements-3",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
    gridArea: "elements-4",
  },
  {
    name: "Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
    gridArea: "elements-5",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
    gridArea: "elements-6",
  },
];

const container = document.querySelector(".elements__container");

// Creación de form para agregar cards

const cardForm = document.querySelector(".popup__card-overlay");
const cardFormContainer = document.getElementById("card-form-container");
const cardFormClose = cardFormContainer.querySelector(".popup__close");
const addButton = document.querySelector(".profile__add-btn");

function openPopupCard() {
  cardForm.classList.add("popup__card-overlay_active");
  const form = cardForm.querySelector("form");
  isValid(form);
}
function closePopupCard() {
  cardForm.classList.remove("popup__card-overlay_active");
}

addButton.addEventListener("click", openPopupCard);
cardFormClose.addEventListener("click", closePopupCard);

// Cerrar el popup al hacer clic fuera del formulario
cardForm.addEventListener("mousedown", (e) => {
  if (e.target === cardForm && !cardFormContainer.contains(e.target)) {
    closePopupCard();
  }
});

//Agregar tarjetas
const addTitle = cardForm.querySelector("#card__add-title");
const addLink = cardForm.querySelector("#card__form-link");
const createBtn = cardForm.querySelector(".popup__btn");

function renderAllCards() {
  container.innerHTML = "";

  initialCards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("elements__card");
    cardElement.style.gridArea = card.gridArea;

    //  Botón de eliminar
    const trashButton = document.createElement("button");
    trashButton.classList.add("elements__trash");

    //  Contenedor de imágenes
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("elements__image-container");

    const rectangle = document.createElement("img");
    rectangle.classList.add("elements__rectangle");
    rectangle.src = "./images/Rectangle.png";
    rectangle.alt = "Decoración";

    const pic = document.createElement("img");
    pic.classList.add("elements__pic");
    pic.src = card.link;
    pic.alt = card.name;

    imageContainer.appendChild(rectangle);
    imageContainer.appendChild(pic);

    // Texto y botón de like
    const textBox = document.createElement("div");
    textBox.classList.add("elements__text-box");

    const text = document.createElement("p");
    text.classList.add("elements__text");
    text.textContent = card.name;

    const likeButton = document.createElement("button");
    likeButton.classList.add("elements__like-btn");

    textBox.appendChild(text);
    textBox.appendChild(likeButton);

    //  Ensamblar tarjeta
    cardElement.appendChild(trashButton);
    cardElement.appendChild(imageContainer);
    cardElement.appendChild(textBox);

    //  Eliminar tarjeta
    trashButton.addEventListener("click", () => {
      initialCards.splice(index, 1);
      initialCards.forEach((item, i) => {
        item.gridArea = `elements-${i + 1}`;
      });
      renderAllCards();
    });

    //  Botón de like
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("elements__like-btn_active");
    });

    //  Zoom
    pic.addEventListener("click", () => {
      imageZoom(card);
    });

    container.appendChild(cardElement);
  });
}

function imageZoom(card) {
  // Limpiar el contenedor
  zoomOverlay.textContent = "";
  zoomOverlay.classList.add("zoom_active");

  // Crear contenedor principal
  const zoomContainer = document.createElement("div");
  zoomContainer.classList.add("elements__zoom-container");

  // Crear contenedor de imagen
  const zoomImgContainer = document.createElement("div");
  zoomImgContainer.classList.add("elements__zoom-img-container");

  // Crear imagen principal
  const zoomImg = document.createElement("img");
  zoomImg.classList.add("elements__zoom-img");
  zoomImg.src = card.link;
  zoomImg.alt = card.name;

  // Crear botón de cerrar
  const closeBtn = document.createElement("img");
  closeBtn.classList.add("elements__close-btn");
  closeBtn.src = "./images/close-icon.png";
  closeBtn.alt = "close-btn";

  // Crear leyenda
  const caption = document.createElement("h3");
  caption.classList.add("elements__zoom-caption");
  caption.textContent = card.name;

  // Asociar evento de cierre
  closeBtn.addEventListener("click", () => {
    zoomOverlay.textContent = "";
    zoomOverlay.classList.remove("zoom_active");
  });

  // Ensamblar todo
  zoomImgContainer.appendChild(zoomImg);
  zoomImgContainer.appendChild(closeBtn);
  zoomImgContainer.appendChild(caption);

  zoomContainer.appendChild(zoomImgContainer);
  zoomOverlay.appendChild(zoomContainer);

  zoomOverlay.addEventListener("click", (e) => {
    zoomOverlay.textContent = "";
    zoomOverlay.classList.remove("zoom_active");
  });
}

renderAllCards();

cardForm.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  if (!event.target.checkValidity()) {
    isValid(event.target);
    return;
  }

  const newName = addTitle.value.trim();
  const newLink = addLink.value.trim();

  if (newName && newLink) {
    const newCard = {
      name: newName,
      link: newLink,
    };

    initialCards.unshift(newCard);

    initialCards.forEach((card, index) => {
      card.gridArea = `elements-${index + 1}`;
    });
    renderAllCards();

    cardForm.querySelector("form").reset();
    closePopupCard();
  } else {
    console.log("Faltan datos en el formulario");
  }
});

// Tecla ESC

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    console.log("Escape presionado");
    // Cierre del popup de perfil
    if (popupProfile.classList.contains("popup__overlay_active")) {
      closePopupProfile();
    }

    // Cierre del formulario de tarjeta
    if (cardForm.classList.contains("popup__card-overlay_active")) {
      closePopupCard();
    }

    // Cierre del zoom de imagen
    if (zoomOverlay.classList.contains("zoom_active")) {
      zoomOverlay.textContent = "";
      zoomOverlay.classList.remove("zoom_active");
    }
  }
});

// Cerrar el popup al hacer clic fuera del formulario
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup-overlay");
  const form = popup.querySelector(".popup__form");

  popup.addEventListener("mousedown", (e) => {
    if (!form.contains(e.target)) {
      closePopupProfile();
    }
  });
});
enableValidation({
  formSelector: ".popup__form",
  inputSelector: "popup__form-item",
  submitButtonSelector: "popup__btn",
  inactiveButtonClass: "popup__btn_disabled",
  inputErrorClass: ".popup__form-error-msg",
});
