// Boton de editar y cerrar perfil
let popup = document.querySelector(".popup");
let editBtn = document.querySelector(".profile__edit-btn");
let closeBtn = popup.querySelector(".popup__close");
function openPopup() {
  popup.classList.remove("popup");
  popup.classList.add("popup_opened");
}
function closePopup() {
  popup.classList.remove("popup_opened");
  popup.classList.add("popup");
}
editBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);

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

/*function renderAllCards() {
  container.innerHTML = "";

  initialCards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("elements__card");
    cardElement.style.gridArea = card.gridArea;

    cardElement.innerHTML = `
      <button class="elements__trash"></button>
      <div class="elements__image-container">
        <img class="elements__rectangle" src="./images/Rectangle.png" alt="Decoración" />
        <img src="${card.link}" alt="${card.name}" class="elements__pic" />
      </div>
      <div class="elements__text-box">
        <p class="elements__text">${card.name}</p>
        <button class="elements__like-btn"></button>
      </div>
    `;

    // ✅ Lógica para eliminar tarjeta
    const trashButton = cardElement.querySelector(".elements__trash");
    trashButton.addEventListener("click", () => {
      initialCards.splice(index, 1); // Elimina del array

      // Reasigna gridArea
      initialCards.forEach((item, i) => {
        item.gridArea = `elements-${i + 1}`;
      });

      renderAllCards(); // Re-renderiza vista
    });

    // Botón de like
    const likeButton = cardElement.querySelector(".elements__like-btn");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("elements__like-btn_active");
    });

    const img = cardElement.querySelector(".elements__pic");
    img.addEventListener("click", () => {
      imageZoom(card); // activa el zoom al hacer click
    });

    container.appendChild(cardElement);
  });
}*/

//Comentario en caso de que no funcione sin innerHTML
/*function imageZoom(card) {
  const zoomOverlay = document.querySelector(".elements__zoom-overlay");

  zoomOverlay.innerHTML = `
    <div class="elements__zoom-container">
      <div class="elements__zoom-img-container">
        <img src="${card.link}" alt="${card.name}" class="elements__zoom-img" />
        <img src="./images/close-icon.png" alt="close-btn" class="elements__close-btn" />
        <h3 class="elements__zoom-caption">${card.name}</h3>
      </div>

    </div>
  `;
  // 👉 Evento del botón cerrar
  const closeBtn = zoomOverlay.querySelector(".elements__close-btn");
  closeBtn.addEventListener("click", () => {
    zoomOverlay.innerHTML = "";
  });
}*/

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
  const zoomOverlay = document.querySelector(".elements__zoom-overlay");

  // Limpiar el contenedor
  zoomOverlay.textContent = ""; // o while (zoomOverlay.firstChild) zoomOverlay.removeChild(zoomOverlay.firstChild);

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
  });

  // Ensamblar todo
  zoomImgContainer.appendChild(zoomImg);
  zoomImgContainer.appendChild(closeBtn);
  zoomImgContainer.appendChild(caption);

  zoomContainer.appendChild(zoomImgContainer);
  zoomOverlay.appendChild(zoomContainer);
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
