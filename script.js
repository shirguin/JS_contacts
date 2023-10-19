let listContacts = [];

//Получаем список контактов из localStorage
if (localStorage.getItem("contacts") !== null) {
  listContacts = JSON.parse(localStorage.getItem("contacts"));
}

const divContactsEl = document.querySelector(".contacts");

//Выводим контакты на экран
listContacts.forEach((contact) => {
  const newContactEl = document.createElement("div");
  newContactEl.className = "contact__item";
  newContactEl.innerHTML = `
        <div class="column contact__name">${contact.name}</div>
        <div class="column contact__surname">${contact.surname}</div>
        <div class="column contact__position">${contact.position}</div>
        <div class="column contact__firmName">${contact.firmName}</div>
        <div class="column contact__email">${contact.email}</div>
        <div class="column contact__telephone">${contact.telephone}</div>

        <div class="icon__button">
            <img class="icon__edit" src="./img/edit.svg" alt="iconedit" />
        </div>

        <div class="icon__button">
            <img class="icon__delete" src="./img/delete.svg" alt="iconedit" />
        </div>
    `;
  divContactsEl.append(newContactEl);
});

//Редактирование контакта
const editButtonEls = document.querySelectorAll(".icon__edit");

editButtonEls.forEach((button) => {
  button.addEventListener("click", (e) => {
    const divItemEl = e.target.closest(".contact__item");

    let name = divItemEl.querySelector(".contact__name").textContent;
    let surname = divItemEl.querySelector(".contact__surname").textContent;
    let position = divItemEl.querySelector(".contact__position").textContent;
    let firmName = divItemEl.querySelector(".contact__firmName").textContent;
    let email = divItemEl.querySelector(".contact__email").textContent;
    let telephone = divItemEl.querySelector(".contact__telephone").textContent;
    console.log("edit");
  });
});

//Удаление контакта
const deleteButtonEls = document.querySelectorAll(".icon__delete");

deleteButtonEls.forEach((button) => {
  button.addEventListener("click", (e) => {
    const divItemEl = e.target.closest(".contact__item");
    let index = getIndex(divItemEl);
    listContacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(listContacts));

    location.reload();
  });
});

//Получение индекса контакта в списке контактов
function getIndex(divItemEl) {
  let name = divItemEl.querySelector(".contact__name").textContent;
  let surname = divItemEl.querySelector(".contact__surname").textContent;
  let position = divItemEl.querySelector(".contact__position").textContent;
  let firmName = divItemEl.querySelector(".contact__firmName").textContent;
  let email = divItemEl.querySelector(".contact__email").textContent;
  let telephone = divItemEl.querySelector(".contact__telephone").textContent;

  for (let i = 0; i < listContacts.length; i++) {
    const contact = listContacts[i];

    if (
      contact.name == name &&
      contact.surname == surname &&
      contact.position == position &&
      contact.firmName == firmName &&
      contact.email == email &&
      contact.telephone == telephone
    ) {
      return i;
    }
  }
}

//Модальное окно добавления контакта
const addButtonEl = document.querySelector(".icon__add");
const modalEl = document.querySelector(".modal");

modalEl.style.cssText = `
  display: flex;
  visibility: hidden;
  opacity: 0;
  transition: opacity 300ms easy-in-out;
`;

//Закрытие модального окна
const closeModal = (event) => {
  const target = event.target;

  if (target === modalEl || target.closest(".modal__close")) {
    modalEl.style.opacity = 0;

    setTimeout(() => {
      modalEl.style.visibility = "hidden";
    }, 300);
  }
};

//Открытие модального окна
const openModal = () => {
  modalEl.style.visibility = "visible";
  modalEl.style.opacity = 1;
};

addButtonEl.addEventListener("click", openModal);
modalEl.addEventListener("click", closeModal);

//Добавление контакта
const addContactButtonEl = document.querySelector(".saveContact");
const exitButtonEl = document.querySelector(".exit");
const nameInputEl = document.querySelector("#name");
const surnameInputEl = document.querySelector("#surname");
const positionInputEl = document.querySelector("#position");
const firmNameInputEl = document.querySelector("#firmName");
const emailInputEl = document.querySelector("#email");
const telephoneInputEl = document.querySelector("#telephone");

addContactButtonEl.addEventListener("click", () => {
  let newContact = {
    name: nameInputEl.value,
    surname: surnameInputEl.value,
    position: positionInputEl.value,
    firmName: firmNameInputEl.value,
    email: emailInputEl.value,
    telephone: telephoneInputEl.value,
  };

  console.log(newContact);

  let listContacts = [];

  if (localStorage.getItem("contacts") !== null) {
    listContacts = JSON.parse(localStorage.getItem("contacts"));
  }

  listContacts.push(newContact);
  localStorage.setItem("contacts", JSON.stringify(listContacts));
  window.location.replace("./index.html");
});

//Выход из формы модального окна
exitButtonEl.addEventListener("click", () => {
  closeModal();
});
