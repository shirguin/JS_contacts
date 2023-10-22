let listContacts = [];
let keySortListContacts = "";

//Получаем список контактов из localStorage
if (localStorage.getItem("contacts") !== null) {
  listContacts = JSON.parse(localStorage.getItem("contacts"));
}

//Получаем ключ по которому отсортированы контакты
if (localStorage.getItem("contacts_key_sort") !== null) {
  keySortListContacts = localStorage.getItem("contacts_key_sort");

  const divHeadersEl = document.querySelector(".headers");
  const sortedColumnHeadingEl = divHeadersEl.querySelector(
    ".contact__" + keySortListContacts
  );
  sortedColumnHeadingEl.classList.add("active");
}

//Навешиваем сортировку на заголовки столбцов
const headersEl = document.querySelector(".headers");
const headingEls = headersEl.querySelectorAll(".heading");

headingEls.forEach((heading) => {
  heading.addEventListener("click", () => {
    const activeEl = headersEl.querySelector(".active");
    activeEl.classList.remove("active");
    heading.classList.add("active");

    //Находим ключ для сортировки
    const key = heading.classList[1].slice(9);
    sortlistContacts(key);

    localStorage.setItem("contacts", JSON.stringify(listContacts));
    localStorage.setItem("contacts_key_sort", key);
    location.reload();
  });
});

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

        <div class="item__buttons">
          <div class="icon__button">
              <img class="icon__edit" src="./img/edit.svg" alt="iconedit" />
          </div>

          <div class="icon__button">
              <img class="icon__delete" src="./img/delete.svg" alt="iconedit" />
          </div>
        </div>
    `;
  divContactsEl.append(newContactEl);
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

//Сортировка массива контактов
function sortlistContacts(key) {
  listContacts.sort((contact1, contact2) =>
    contact1[key] > contact2[key] ? 1 : -1
  );
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
const addButtonEl = document.querySelector(".addContact");
addButtonEl.addEventListener("click", () => {
  //Вставляем в модальное окно форму для ввода нового контакта
  const html = `
          <h1 class="title">Добавление контакта</h1>
          <div class="forma">
            <div class="form__item">
              <p class="label">Имя</p>
              <input class="textInput" type="text" id="name" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Фамилия</p>
              <input class="textInput" type="text" id="surname" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Должность</p>
              <input class="textInput" type="text" id="position" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Фирма</p>
              <input class="textInput" type="text" id="firmName" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Email</p>
              <input class="textInput" type="email" id="email" autocomplete="off"/>
            </div>

            <div class="form__item">
              <lp class="label">Телефон</lp>
              <input class="textInput" type="text" id="telephone" autocomplete="off"/>
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

    listContacts.push(newContact);

    if (keySortListContacts === "") {
      keySortListContacts = "surname";
      localStorage.setItem("contacts_key_sort", keySortListContacts);
    }

    //сортируем массив
    sortlistContacts(keySortListContacts);

    localStorage.setItem("contacts", JSON.stringify(listContacts));

    //Очищаем модальное окно
    clearModal();

    //Обновляем страницу
    location.reload();
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
              <input class="textInput" type="text" id="name" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Фамилия</p>
              <input class="textInput" type="text" id="surname" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Должность</p>
              <input class="textInput" type="text" id="position" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Фирма</p>
              <input class="textInput" type="text" id="firmName" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Email</p>
              <input class="textInput" type="email" id="email" autocomplete="off"/>
            </div>

            <div class="form__item">
              <lp class="label">Телефон</lp>
              <input class="textInput" type="text" id="telephone" autocomplete="off"/>
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

      //сортируем массив
      sortlistContacts(keySortListContacts);

      localStorage.setItem("contacts", JSON.stringify(listContacts));

      //Очищаем модальное окно
      clearModal();

      //Обновляем страницу
      location.reload();
    });

    //Выход из формы модального окна
    exitButtonEl.addEventListener("click", () => {
      clearModal();
      closeModal();
    });
  });
});

//Удаление контакта
const deleteButtonEls = document.querySelectorAll(".icon__delete");

deleteButtonEls.forEach((button) => {
  button.addEventListener("click", (e) => {
    const divItemEl = e.target.closest(".contact__item");
    let index = getIndex(divItemEl);
    let deleteContact = listContacts[index];

    const html = `
          <h1 class="title">Удалить контакт?</h1>
          <div class="forma">
            <div class="form__item">
              <p class="label">Имя</p>
              <input class="textInput" type="text" id="name" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Фамилия</p>
              <input class="textInput" type="text" id="surname" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Должность</p>
              <input class="textInput" type="text" id="position" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Фирма</p>
              <input class="textInput" type="text" id="firmName" autocomplete="off"/>
            </div>

            <div class="form__item">
              <p class="label">Email</p>
              <input class="textInput" type="email" id="email" autocomplete="off"/>
            </div>

            <div class="form__item">
              <lp class="label">Телефон</lp>
              <input class="textInput" type="text" id="telephone" autocomplete="off"/>
            </div>

            <div class="blockButtons">
              <button class="btn deleteContact">Удалить</button>
              <button class="btn exit">Выход</button>
            </div>
          </div>
  `;
    modalContentEl.innerHTML = html;

    //Вставляем данные в форму
    const deleteContactButtonEl = document.querySelector(".deleteContact");
    const exitButtonEl = document.querySelector(".exit");
    const nameInputEl = document.querySelector("#name");
    const surnameInputEl = document.querySelector("#surname");
    const positionInputEl = document.querySelector("#position");
    const firmNameInputEl = document.querySelector("#firmName");
    const emailInputEl = document.querySelector("#email");
    const telephoneInputEl = document.querySelector("#telephone");

    nameInputEl.value = deleteContact.name;
    surnameInputEl.value = deleteContact.surname;
    positionInputEl.value = deleteContact.position;
    firmNameInputEl.value = deleteContact.firmName;
    emailInputEl.value = deleteContact.email;
    telephoneInputEl.value = deleteContact.telephone;

    //открываем модальное окно
    openModal();

    //Удаление
    deleteContactButtonEl.addEventListener("click", () => {
      listContacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(listContacts));

      location.reload();
    });

    //Выход из формы модального окна
    exitButtonEl.addEventListener("click", () => {
      clearModal();
      closeModal();
    });
  });
});

//Правый блок (Планы)
let listPlans = [];
let keySortListPlans = "";

//Получаем список запланированных дел из localStorage
if (localStorage.getItem("plans") !== null) {
  listPlans = JSON.parse(localStorage.getItem("plans"));
}

//Получаем ключ по которому отсортированы планы
if (localStorage.getItem("plans_key_sort") !== null) {
  keySortListPlans = localStorage.getItem("plans_key_sort");

  const divPlansHeadersEl = document.querySelector(".plan__headers");
  const sortedColumnHeadingEl = divPlansHeadersEl.querySelector(
    ".plan__" + keySortListPlans
  );
  sortedColumnHeadingEl.classList.add("active");
}

//Навешиваем сортировку на заголовки столбцов
const divPlansHeadersEl = document.querySelector(".plan__headers");
const headingPlanEls = divPlansHeadersEl.querySelectorAll(".heading");

headingPlanEls.forEach((heading) => {
  heading.addEventListener("click", () => {
    const activeEl = divPlansHeadersEl.querySelector(".active");
    activeEl.classList.remove("active");
    heading.classList.add("active");

    //Находим ключ для сортировки
    const key = heading.classList[1].slice(6);
    sortlistPlans(key);

    localStorage.setItem("plans", JSON.stringify(listPlans));
    localStorage.setItem("plans_key_sort", key);
    location.reload();
  });
});

const divPlansEl = document.querySelector(".plans");

//Выводим планы на экран
listPlans.forEach((plan) => {
  const newPlanEl = document.createElement("div");
  newPlanEl.className = "plan__item";
  newPlanEl.innerHTML = `
        <div class="column__plan plan__date">${plan.date}</div>
        <div class="column__plan plan__text">${plan.text}</div>

        <div class="item__buttons">
          <div class="icon__button">
              <img class="icon__edit editPlan" src="./img/edit.svg" alt="iconedit" />
          </div>

          <div class="icon__button">
              <img class="icon__delete deletePlan" src="./img/delete.svg" alt="iconedit" />
          </div>
        </div>
    `;
  divPlansEl.append(newPlanEl);
});

const addPlanButtonEl = document.querySelector(".addPlan");
addPlanButtonEl.addEventListener("click", () => {
  //Вставляем в модальное окно форму для ввода нового плана
  const html = `
    <h1 class="title">Добавление нового дела</h1>
    <div class="forma">
      <div class="form__item">
        <textarea class="planText" cols="50" rows="10" autocomplete="off" autofocus></textarea>
      </div>

      <div class="blockButtons">
        <button class="btn addPlanBtn">Добавить</button>
        <button class="btn exitPlanBtn">Выход</button>
      </div>
    </div>
`;
  modalContentEl.innerHTML = html;

  //открываем модальное окно
  openModal();

  //Добавление нового плана
  const savePlanButtonEl = document.querySelector(".addPlanBtn");
  const exitPlanButtonEl = document.querySelector(".exitPlanBtn");
  const textareaEl = document.querySelector(".planText");

  /*   //Устанавливаем фокус на текстовое поле
  textareaEl.focus(); */

  savePlanButtonEl.addEventListener("click", () => {
    const currentDate = new Date();
    const newPlan = {
      /*       date: new Date().toLocaleDateString(), */
      date: `${currentDate.toLocaleDateString().slice(0, 6)}${currentDate
        .toLocaleDateString()
        .slice(8, 10)} ${currentDate.toTimeString().slice(0, 5)}`,
      text: textareaEl.value,
    };

    listPlans.push(newPlan);

    if (keySortListPlans === "") {
      keySortListPlans = "date";
      localStorage.setItem("plans_key_sort", keySortListPlans);
    }

    //сортируем массив
    sortlistPlans(keySortListPlans);

    localStorage.setItem("plans", JSON.stringify(listPlans));

    //Очищаем модальное окно
    clearModal();

    //Обновляем страницу
    location.reload();
  });

  //Выход из формы модального окна
  exitPlanButtonEl.addEventListener("click", () => {
    clearModal();
    closeModal();
  });
});

//Редактирование плана
const editPlanButtonEls = document.querySelectorAll(".editPlan");

editPlanButtonEls.forEach((button) => {
  button.addEventListener("click", (e) => {
    const divItemEl = e.target.closest(".plan__item");
    let indexEditPlan = getIndexPlan(divItemEl);
    const editplan = listPlans[indexEditPlan];

    const html = `
      <h1 class="title">Редактирование дела</h1>
      <div class="forma">
        <div class="form__item">
          <textarea class="planText" cols="50" rows="10" autocomplete="off" autofocus></textarea>
        </div>

        <div class="blockButtons">
          <button class="btn addPlanBtn">Добавить</button>
          <button class="btn exitPlanBtn">Выход</button>
        </div>
      </div>
  `;
    modalContentEl.innerHTML = html;

    //Вставляем данные в форму
    const savePlanButtonEl = document.querySelector(".addPlanBtn");
    const exitButtonEl = document.querySelector(".exitPlanBtn");
    const textInputEl = document.querySelector(".planText");

    textInputEl.value = editplan.text;

    //открываем модальное окно
    openModal();

    //сохраняем отредактированные данные
    savePlanButtonEl.addEventListener("click", () => {
      let newPlan = {
        date: editplan.date,
        text: textInputEl.value,
      };

      listPlans[indexEditPlan] = newPlan;

      //сортируем массив
      sortlistPlans(keySortListPlans);

      localStorage.setItem("plans", JSON.stringify(listPlans));

      //Очищаем модальное окно
      clearModal();

      //Обновляем страницу
      location.reload();
    });

    //Выход из формы модального окна
    exitButtonEl.addEventListener("click", () => {
      clearModal();
      closeModal();
    });
  });
});

//Удаление плана
const deletePlanBtnEls = document.querySelectorAll(".deletePlan");

deletePlanBtnEls.forEach((button) => {
  button.addEventListener("click", (e) => {
    const divItemEl = e.target.closest(".plan__item");
    let index = getIndexPlan(divItemEl);
    let deletePlan = listPlans[index];

    const html = `
      <h1 class="title">Удалить запланированное дело?</h1>
      <div class="forma">
        <div class="form__item">
          <textarea class="planText" cols="50" rows="10" autocomplete="off"></textarea>
        </div>

        <div class="blockButtons">
          <button class="btn delPlan">Удалить</button>
          <button class="btn exit">Выход</button>
        </div>
      </div>
  `;
    modalContentEl.innerHTML = html;

    //Вставляем данные в форму
    const deletePlanButtonEl = document.querySelector(".delPlan");
    const exitButtonEl = document.querySelector(".exit");
    const textInputEl = document.querySelector(".planText");

    textInputEl.value = deletePlan.text;

    //открываем модальное окно
    openModal();

    //Удаление
    deletePlanButtonEl.addEventListener("click", () => {
      listPlans.splice(index, 1);
      localStorage.setItem("plans", JSON.stringify(listPlans));

      location.reload();
    });

    //Выход из формы модального окна
    exitButtonEl.addEventListener("click", () => {
      clearModal();
      closeModal();
    });
  });
});

//Получение индекса плана в списке дел
function getIndexPlan(divItemEl) {
  let date = divItemEl.querySelector(".plan__date").textContent;
  let text = divItemEl.querySelector(".plan__text").textContent;

  for (let i = 0; i < listPlans.length; i++) {
    const plan = listPlans[i];

    if (plan.date == date && plan.text == text) {
      return i;
    }
  }
}

//Сортировка массива планов
function sortlistPlans(key) {
  listPlans.sort((plan1, plan2) => (plan1[key] > plan2[key] ? 1 : -1));
}

//Чтение файла
const openFileButtonEl = document.querySelector(".openFileButton");

const optionsLoad = {
  // можно выбирать несколько файлов
  multiple: false,
  // разрешенный тип файлов
  types: [
    {
      description: "Text",
      accept: {
        "text/plain": ".txt",
      },
    },
  ],
  // можно выбирать только разрешенные файлы
  // по моим наблюдениям, данная настройка работает не совсем корректно
  excludeAcceptAllOption: true,
};

openFileButtonEl.addEventListener("click", async () => {
  const [fileHandle] = await window.showOpenFilePicker(optionsLoad);

  const file = await fileHandle.getFile();

  if (file.name === "to-doList.txt") {
    const fileContent = await file.text();

    //Сделать модальное окно с сообщением!!!!
    listPlans = JSON.parse(fileContent);

    localStorage.setItem("plans", JSON.stringify(listPlans));

    //Очищаем модальное окно
    clearModal();

    //Обновляем страницу
    location.reload();
  } else {
    //Сделать модальное окно с сообщением!!!!
    console.log("Можно открыть только to-doList.txt");
  }
});

//Запись списка дел в файл
const saveFileButtonEl = document.querySelector(".saveFileButton");

// настройки
const optionsSave = {
  // рекомендуемое название файла
  suggestedName: "to-doList.txt",
  types: [
    {
      description: "Text",
      accept: {
        "text/plain": ".txt",
      },
    },
  ],
  excludeAcceptAllOption: true,
};

// данные для записи
const fileData = JSON.stringify(listPlans);

saveFileButtonEl.addEventListener("click", async () => {
  const fileHandle = await window.showSaveFilePicker(optionsSave);
  const writableStream = await fileHandle.createWritable();

  await writableStream.write(fileData);
  // данный метод не упоминается в черновике спецификации,
  // хотя там говорится о необходимости закрытия потока
  // для успешной записи файла
  await writableStream.close();
});
