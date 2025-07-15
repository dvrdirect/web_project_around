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
initialCards.forEach((data) => {
  const card = document.createElement("div");
  card.classList.add("elements__card");
  card.style.gridArea = data.gridArea;

  card.innerHTML = `
  <div class="elements__image-container">
  <img
      class="elements__rectangle"
      src="./images/Rectangle.png"
      alt="Decoración"
    />
  <img src="${data.link}" alt"${data.name}" class="elements__pic"/>
  </div>
  <div class="elements__text-box">
    <p class="elements__text">${data.name}</p>
    <button class="elements__like-btn"></button>
  </div>
`;
  container.appendChild(card);
});

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

  initialCards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("elements__card");
    cardElement.style.gridArea = card.gridArea;

    cardElement.innerHTML = `
      <div class="elements__image-container">
        <img class="elements__rectangle" src="./images/Rectangle.png" alt="Decoración" />
        <img src="${card.link}" alt="${card.name}" class="elements__pic" />
      </div>
      <div class="elements__text-box">
        <p class="elements__text">${card.name}</p>
        <button class="elements__like-btn"></button>
      </div>
    `;

    const likeButton = cardElement.querySelector(".elements__like-btn");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("elements__like-btn_active");
    });

    container.appendChild(cardElement);
  });
}

createBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const newName = addTitle.value.trim();
  const newLink = addLink.value.trim();

  if (newName && newLink) {
    const newCard = {
      name: newName,
      link: newLink,
      gridArea: "elements-1",
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

//Like button

const likeBtn = document.querySelectorAll(".elements__like-btn");
likeBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    btn.classList.toggle("elements__like-btn_active");
  });
});
console.log(initialCards);
