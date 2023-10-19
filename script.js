let listContacts = [];

//Получаем список контактов из localStorage
if (localStorage.getItem("contacts") !== null) {
  listContacts = JSON.parse(localStorage.getItem("contacts"));
}

const divContactsEl = document.querySelector(".contacts");

//Добавляем заголовки с фильтрами.
const headersContactEl = ``;

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

//Модальное окно
const modalEl = document.querySelector(".modal");
const modalContentEl = document.querySelector(".modal__content");

modalEl.style.cssText = `
  display: flex;
  visibility: hidden;
  opacity: 0;
  transition: opacity 300ms easy-in-out;
`;

//Закрытие модального окна
const closeModal = () => {
  modalEl.style.opacity = 0;
  modalEl.style.visibility = "hidden";
};

//Открытие модального окна
const openModal = () => {
  modalEl.style.visibility = "visible";
  modalEl.style.opacity = 1;
};

//Очистка модального окна
const clearModal = () => {
  modalContentEl.innerHTML = "";
};

//Добавление контакта
const addButtonEl = document.querySelector(".icon__add");
addButtonEl.addEventListener("click", () => {
  //Вставляем в модальное окно форму для ввода нового контакта
  const html = `
          <h1 class="title">Добавление контакта</h1>
          <div class="forma">
            <div class="form__item">
              <p class="label">Имя</p>
              <input class="textInput" type="text" id="name" />
            </div>

            <div class="form__item">
              <p class="label">Фамилия</p>
              <input class="textInput" type="text" id="surname" />
            </div>

            <div class="form__item">
              <p class="label">Должность</p>
              <input class="textInput" type="text" id="position" />
            </div>

            <div class="form__item">
              <p class="label">Фирма</p>
              <input class="textInput" type="text" id="firmName" />
            </div>

            <div class="form__item">
              <p class="label">Email</p>
              <input class="textInput" type="email" id="email" />
            </div>

            <div class="form__item">
              <lp class="label">Телефон</lp>
              <input class="textInput" type="text" id="telephone" />
            </div>

            <div class="blockButtons">
              <button class="btn saveContact">Добавить</button>
              <button class="btn exit">Выход</button>
            </div>
          </div>
  `;
  modalContentEl.innerHTML = html;

  //открываем модальное окно
  openModal();

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

    let listContacts = [];

    if (localStorage.getItem("contacts") !== null) {
      listContacts = JSON.parse(localStorage.getItem("contacts"));
    }

    listContacts.push(newContact);
    localStorage.setItem("contacts", JSON.stringify(listContacts));

    //Очищаем модальное окно
    clearModal();

    //Обновляем страницу
    window.location.replace("./index.html");
  });

  //Выход из формы модального окна
  exitButtonEl.addEventListener("click", () => {
    clearModal();
    closeModal();
  });
});

//Редактирование контакта
const editButtonEls = document.querySelectorAll(".icon__edit");

editButtonEls.forEach((button) => {
  button.addEventListener("click", (e) => {
    const divItemEl = e.target.closest(".contact__item");
    let indexEditContact = getIndex(divItemEl);
    const editContact = listContacts[indexEditContact];

    const html = `
          <h1 class="title">Редактирование контакта</h1>
          <div class="forma">
            <div class="form__item">
              <p class="label">Имя</p>
              <input class="textInput" type="text" id="name" />
            </div>

            <div class="form__item">
              <p class="label">Фамилия</p>
              <input class="textInput" type="text" id="surname" />
            </div>

            <div class="form__item">
              <p class="label">Должность</p>
              <input class="textInput" type="text" id="position" />
            </div>

            <div class="form__item">
              <p class="label">Фирма</p>
              <input class="textInput" type="text" id="firmName" />
            </div>

            <div class="form__item">
              <p class="label">Email</p>
              <input class="textInput" type="email" id="email" />
            </div>

            <div class="form__item">
              <lp class="label">Телефон</lp>
              <input class="textInput" type="text" id="telephone" />
            </div>

            <div class="blockButtons">
              <button class="btn saveContact">Сохранить</button>
              <button class="btn exit">Выход</button>
            </div>
          </div>
  `;
    modalContentEl.innerHTML = html;

    //Вставляем данные в форму
    const saveContactButtonEl = document.querySelector(".saveContact");
    const exitButtonEl = document.querySelector(".exit");
    const nameInputEl = document.querySelector("#name");
    const surnameInputEl = document.querySelector("#surname");
    const positionInputEl = document.querySelector("#position");
    const firmNameInputEl = document.querySelector("#firmName");
    const emailInputEl = document.querySelector("#email");
    const telephoneInputEl = document.querySelector("#telephone");

    nameInputEl.value = editContact.name;
    surnameInputEl.value = editContact.surname;
    positionInputEl.value = editContact.position;
    firmNameInputEl.value = editContact.firmName;
    emailInputEl.value = editContact.email;
    telephoneInputEl.value = editContact.telephone;

    //открываем модальное окно
    openModal();

    //сохраняем отредактированные данные
    saveContactButtonEl.addEventListener("click", () => {
      let newContact = {
        name: nameInputEl.value,
        surname: surnameInputEl.value,
        position: positionInputEl.value,
        firmName: firmNameInputEl.value,
        email: emailInputEl.value,
        telephone: telephoneInputEl.value,
      };

      listContacts[indexEditContact] = newContact;

      localStorage.setItem("contacts", JSON.stringify(listContacts)); 

      //Очищаем модальное окно
      clearModal();

      //Обновляем страницу
      window.location.replace("./index.html");
    });

    //Выход из формы модального окна
    exitButtonEl.addEventListener("click", () => {
      clearModal();
      closeModal();
    });
  });
});
