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

//Добавление контакта
const addButtonEl = document.querySelector(".icon__add");

addButtonEl.addEventListener("click", () => {
  /*   window.location.replace("./addContact.html"); */

  showCover();
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

// Показать полупрозрачный DIV, чтобы затенить страницу
// (форма располагается не внутри него, а рядом, потому что она не должна быть полупрозрачной)
function showCover() {
  let coverDiv = document.createElement("div");
  coverDiv.id = "cover-div";

  // убираем возможность прокрутки страницы во время показа модального окна с формой
  document.body.style.overflowY = "hidden";

  document.body.append(coverDiv);
}

function hideCover() {
  document.getElementById("cover-div").remove();
  document.body.style.overflowY = "";
}
