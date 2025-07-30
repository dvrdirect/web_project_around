const popup = document.querySelector("#formulario");

const zoomOverlay = document.querySelector(".elements__zoom-overlay");
const content = popup.querySelector(".popup__form");
const editBtn = document.querySelector(".profile__edit-btn");
const closeBtn = popup.querySelector(".popup__close");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

editBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);

// Esta es la única que necesitas
popup.addEventListener("click", (e) => {
  if (!content.contains(e.target)) {
    closePopup();
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
formElement.addEventListener("submit", closePopup);

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

const cardFormClose = document.querySelector("#cerrar");
const addButton = document.querySelector(".profile__add-btn");
const cardForm = document.querySelector(".card__form");
const showDisplay = () => {
  cardForm.classList.remove("card__form");
  cardForm.classList.add("card__form-active");
};
function removeDisplay() {
  cardForm.classList.remove("card__form-active");
  cardForm.classList.add("card__form");
}
addButton.addEventListener("click", showDisplay);
cardFormClose.addEventListener("click", removeDisplay);

//Agregar tarjetas
const addTitle = cardForm.querySelector("#card__add-title");
const addLink = cardForm.querySelector("#card__form-link");
const createBtn = cardForm.querySelector(".card__form-button");

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

createBtn.addEventListener("click", function (event) {
  event.preventDefault();

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

    cardForm.reset();
    removeDisplay();
  } else {
    console.log("Faltan datos en el formulario");
  }
});

// Tecla ESC

const escapeKey = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Cierre del popup de perfil
      if (popup.classList.contains("popup_opened")) {
        closePopup();
      }

      // Cierre del formulario de tarjeta
      if (cardForm.classList.contains("card__form-active")) {
        removeDisplay();
      }

      // Cierre del zoom de imagen
      if (zoomOverlay.classList.contains("zoom_active")) {
        zoomOverlay.textContent = "";
        zoomOverlay.classList.remove("zoom_active");
      }
    }
  });
};

escapeKey();

// Cerrar el popup al hacer clic fuera del formulario
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("formulario");
  const form = popup.querySelector(".popup__form");

  popup.addEventListener("mousedown", (e) => {
    if (!form.contains(e.target)) {
      popup.style.display = "none";
    }
  });
});

// Juntando las forms

const allForms = document.querySelectorAll("form");

//Funciones de validación

const showInputError = (input) => {
  input.classList.add("card__input-error");

  const errorSpan = input.parentElement.querySelector(
    ".card__form-error-msg, .popup__form-error-msg"
  );

  if (errorSpan) {
    if (input.validity.valueMissing) {
      errorSpan.textContent = "Por favor, rellena este campo";
    } else if (input.validity.tooShort || input.validity.tooLong) {
      errorSpan.textContent = `Debe tener mínimo ${input.minLength} caracteres. Actualmente tienes 1 Caracter`;
    } else if (input.validity.typeMismatch && input.type === "url") {
      errorSpan.textContent = "Por favor, introduce una dirección web";
    } else {
      errorSpan.textContent = input.validationMessage || "Campo inválido";
    }
  }
};

const hideInputError = (input) => {
  input.classList.remove("card__input-error");

  const errorSpan = input.parentElement.querySelector(
    ".card__form-error-msg, .popup__form-error-msg"
  );

  if (errorSpan) {
    errorSpan.textContent = "";
  }
};

const isValid = (form) => {
  const inputs = form.querySelectorAll("input");
  const submitBtn = form.querySelector("button[type='submit']");

  let formIsValid = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      formIsValid = false;
      hideInputError(input);
    } else if (!input.validity.valid) {
      formIsValid = false;
      showInputError(input);
    } else {
      hideInputError(input);
    }
  });

  if (submitBtn) {
    submitBtn.disabled = !formIsValid;
  }
};

const allInputs = document.querySelectorAll("input");

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const parentForm = input.closest("form");
    if (parentForm) {
      isValid(parentForm);
    }
  });
});

// Activando estilos para validación

allForms.forEach((form) => {
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    isValid(form);
  });
});

allForms.forEach((form) => {
  isValid(form);
});
