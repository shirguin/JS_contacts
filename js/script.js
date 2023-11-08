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
              <img class="icon__edit icon" src="./img/edit.svg" alt="iconedit" />
          </div>

          <div class="icon__button">
              <img class="icon__delete icon" src="./img/delete.svg" alt="iconedit" />
          </div>
        </div>
    `;
  divContactsEl.append(newContactEl);
});

//Получение индекса контакта в списке контактов
const getIndex = (divItemEl) => {
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
};

//Сортировка массива контактов
const sortlistContacts = (key) => {
  listContacts.sort((contact1, contact2) =>
    contact1[key] > contact2[key] ? 1 : -1
  );
};

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
const addButtonEls = document.querySelectorAll(".addContact");

addButtonEls.forEach((element) => {
  element.addEventListener("click", () => {
    createNewContact();
  });
});

//Формирование формы модального окна Контакта
const getContactHtmlModal = (title, nameButton) => {
  const html = `
  <h1 class="title">${title}</h1>
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
      <button class="btn saveContact">${nameButton}</button>
      <button class="btn exit">Выход</button>
    </div>
  </div>  
`;
  return html;
};

//Функция создает новый контакт
const createNewContact = () => {
  //Вставляем в модальное окно форму для ввода нового контакта
  modalContentEl.innerHTML = getContactHtmlModal(
    "Добавление контакта",
    "Добавить"
  );

  //открываем модальное окно
  openModal();

  //Добавление контакта
  const addContactButtonEl = document.querySelector(".saveContact");
  const exitButtonEl = document.querySelector(".exit");
  const nameInputEl = document.querySelector("#name");
  nameInputEl.focus();
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

    //Закрываем модальное окно
    closeModal();

    //Обновляем страницу
    location.reload();
  });

  //Выход из формы модального окна
  exitButtonEl.addEventListener("click", () => {
    clearModal();
    closeModal();
  });
};

//Редактирование контакта
const editButtonEls = document.querySelectorAll(".icon__edit");

editButtonEls.forEach((button) => {
  button.addEventListener("click", (e) => {
    const divItemEl = e.target.closest(".contact__item");
    let indexEditContact = getIndex(divItemEl);
    const editContact = listContacts[indexEditContact];

    //Вставляем в модальное окно форму для редактирования контакта
    modalContentEl.innerHTML = getContactHtmlModal(
      "Редактирование контакта",
      "Сохранить"
    );

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

    //Открываем модальное окно
    openModal();

    nameInputEl.focus();

    //Сохраняем отредактированные данные
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

    //Вставляем в модальное окно форму для удаления контакта
    modalContentEl.innerHTML = getContactHtmlModal(
      "Удалить контакт?",
      "Удалить"
    );

    //Вставляем данные в форму
    const deleteContactButtonEl = document.querySelector(".saveContact");
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

    exitButtonEl.focus();

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

//Правый блок (Планы)-----------------------------------------------------------
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

    if (key === "checked") {
      sortListPlansByPriority();
    } else {
      sortlistPlans(key);
    }

    localStorage.setItem("plans", JSON.stringify(listPlans));
    localStorage.setItem("plans_key_sort", key);
    location.reload();
  });
});

const divPlansEl = document.querySelector(".plans");

//Выводим планы на экран
listPlans.forEach((plan) => {
  let checked = "";
  let priority = "";
  if (plan.priority) {
    checked = "checked";
    priority = "priority";
  }

  const newPlanEl = document.createElement("div");
  newPlanEl.className = "plan__item";
  newPlanEl.innerHTML = `
        <div class="column__plan plan__date ${priority}">${plan.date}</div>
        <div class="column__plan plan__checked"><input class="plan__checkbox ${priority}" type="checkbox" name="checkbox" ${checked}/></div>
        <div class="column__plan plan__text ${priority}">${plan.text}</div>

        <div class="item__buttons">
          <div class="icon__button">
              <img class="icon editPlan" src="./img/edit.svg" alt="iconedit" />
          </div>

          <div class="icon__button">
              <img class="icon deletePlan" src="./img/delete.svg" alt="iconedit" />
          </div>
        </div>
    `;
  divPlansEl.append(newPlanEl);
});

//Добавление нового дела
const addPlanButtonEls = document.querySelectorAll(".addPlan");

addPlanButtonEls.forEach((element) => {
  element.addEventListener("click", () => {
    createNewPlan();
  });
});

//Формирование формы модального окна Плана
const getPlanHtmlModal = (title, nameButton) => {
  const html = `
    <h1 class="title">${title}</h1>
    <div class="forma">
      <div class="form__item">
        <textarea class="planText" name="planText" cols="50" rows="10" autocomplete="off"></textarea>
      </div>

      <div class="blockButtons">
        <button class="btn savePlanBtn">${nameButton}</button>
        <button class="btn exitPlanBtn">Выход</button>
      </div>
    </div>
`;

  return html;
};

//Функция создает новый план
const createNewPlan = () => {
  //Вставляем в модальное окно форму для ввода нового плана
  modalContentEl.innerHTML = getPlanHtmlModal(
    "Добавление нового дела",
    "Добавить"
  );

  //открываем модальное окно
  openModal();

  //Добавление нового плана
  const savePlanButtonEl = document.querySelector(".savePlanBtn");
  const exitPlanButtonEl = document.querySelector(".exitPlanBtn");
  const textareaEl = document.querySelector(".planText");

  //Устанавливаем фокус на текстовое поле
  textareaEl.focus();

  savePlanButtonEl.addEventListener("click", () => {
    const currentDate = new Date();
    const newPlan = {
      date: `${currentDate.toLocaleDateString().slice(0, 6)}${currentDate
        .toLocaleDateString()
        .slice(8, 10)} ${currentDate.toTimeString().slice(0, 5)}`,
      priority: false,
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
};

//Редактирование плана
const editPlanButtonEls = document.querySelectorAll(".editPlan");

editPlanButtonEls.forEach((button) => {
  button.addEventListener("click", (e) => {
    const divItemEl = e.target.closest(".plan__item");
    let indexEditPlan = getIndexPlan(divItemEl);
    const editplan = listPlans[indexEditPlan];

    //Вставляем в модальное окно форму для редактирования плана
    modalContentEl.innerHTML = getPlanHtmlModal(
      "Редактирование дела",
      "Сохранить"
    );

    //Вставляем данные в форму
    const savePlanButtonEl = document.querySelector(".savePlanBtn");
    const exitButtonEl = document.querySelector(".exitPlanBtn");
    const textInputEl = document.querySelector(".planText");

    textInputEl.value = editplan.text;

    //открываем модальное окно
    openModal();

    textInputEl.focus();

    //сохраняем отредактированные данные
    savePlanButtonEl.addEventListener("click", () => {
      let newPlan = {
        date: editplan.date,
        priority: editplan.priority,
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

    //Вставляем в модальное окно форму для удаления плана
    modalContentEl.innerHTML = getPlanHtmlModal(
      "Удалить запланированное дело?",
      "Удалить"
    );

    //Вставляем данные в форму
    const deletePlanButtonEl = document.querySelector(".savePlanBtn");
    const exitButtonEl = document.querySelector(".exitPlanBtn");
    const textInputEl = document.querySelector(".planText");

    textInputEl.value = deletePlan.text;

    //открываем модальное окно
    openModal();

    exitButtonEl.focus();

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
const getIndexPlan = (divItemEl) => {
  let date = divItemEl.querySelector(".plan__date").textContent;
  let text = divItemEl.querySelector(".plan__text").textContent;

  for (let i = 0; i < listPlans.length; i++) {
    const plan = listPlans[i];

    if (plan.date == date && plan.text == text) {
      return i;
    }
  }
};

//Получение объекта Date из строки
const getDateFromStr = (str) => {
  const stringDate = `20${str.slice(6,8)}-${str.slice(3,5)}-${str.slice(0,2)} ${str.slice(9,14)}`
  const date = new Date(stringDate);
  return date;
};

//Сортировка массива планов
const sortlistPlans = (key) => {
  if (key === "date") {
    listPlans.sort((plan1, plan2) => (getDateFromStr(plan1[key]) > getDateFromStr(plan2[key]) ? 1 : -1));
  } else {
    listPlans.sort((plan1, plan2) => (plan1[key] > plan2[key] ? 1 : -1));
  }
};

//Сортировка массива планов по приоретету
const sortListPlansByPriority = () => {
  //Сначала сортируем по дате
  sortlistPlans("date");

  //Все приорететные поднимаем в верх списка
  listPlans.sort((x, y) => {
    return x.priority === y.priority ? 0 : x.priority ? -1 : 1;
  });
};

//Установка важности дел
const checkboxEls = document.querySelectorAll(".plan__checkbox");
checkboxEls.forEach((element) => {
  element.addEventListener("change", (e) => {
    const divItemEl = e.target.closest(".plan__item");
    const index = getIndexPlan(divItemEl);
    const currentPlan = listPlans[index];

    if (e.target.checked) {
      currentPlan.priority = true;
    } else {
      currentPlan.priority = false;
    }

    listPlans[index] = currentPlan;
    localStorage.setItem("plans", JSON.stringify(listPlans));
    location.reload();
  });
});

//----------------------------------------------------------
//Загрузка данных из файла

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
  excludeAcceptAllOption: true,
};

//Загрузка списка дел
const openPlansFileButtonEl = document.querySelector(".openPlansFileButton");

openPlansFileButtonEl.addEventListener("click", async () => {
  const [fileHandle] = await window.showOpenFilePicker(optionsLoad);

  const file = await fileHandle.getFile();

  if (file.name === "to-doList.txt") {
    const fileContent = await file.text();

    //Вставляем в модальное окно вопрос о замене списка дел
    const html = `
      <h1 class="title">Заменить список дел списком из файла?</h1>
      <div class="forma">
          
        <div class="blockButtons">
          <button class="btn replacePlanBtn">Заменить</button>
          <button class="btn exitPlanBtn">Выход</button>
        </div>
      </div>
  `;
    modalContentEl.innerHTML = html;

    const replacePlanButtonEl = document.querySelector(".replacePlanBtn");
    const exitPlanBtn = document.querySelector(".exitPlanBtn");

    openModal();

    exitPlanBtn.focus();

    replacePlanButtonEl.addEventListener("click", () => {
      listPlans = JSON.parse(fileContent);
      localStorage.setItem("plans", JSON.stringify(listPlans));

      clearModal();
      closeModal();
      location.reload();
    });

    exitPlanBtn.addEventListener("click", () => {
      clearModal();
      closeModal();
    });
  } else {
    //Вставляем в модальное окно сообщение, что не тот файл
    const html = `
      <h1 class="title">Данные можно загрузить только из файла:</h1>
      <h1 class="title">to-doList.txt</h1>
      <div class="forma">
          
        <div class="blockButtons">
          <button class="btn exitPlanBtn">ОК</button>
        </div>
      </div>
  `;
    modalContentEl.innerHTML = html;

    const exitPlanBtn = document.querySelector(".exitPlanBtn");

    openModal();

    exitPlanBtn.focus();

    exitPlanBtn.addEventListener("click", () => {
      clearModal();
      closeModal();
    });
  }
});

//Загрузка списка контактов
const openContactsFileButtonEl = document.querySelector(
  ".openContactsFileButton"
);

openContactsFileButtonEl.addEventListener("click", async () => {
  const [fileHandle] = await window.showOpenFilePicker(optionsLoad);

  const file = await fileHandle.getFile();

  if (file.name === "contactList.txt") {
    const fileContent = await file.text();

    //Вставляем в модальное окно вопрос о замене списка контактов
    const html = `
      <h1 class="title">Заменить список контактов списком из файла?</h1>
      <div class="forma">
          
        <div class="blockButtons">
          <button class="btn replaceContactBtn">Заменить</button>
          <button class="btn exitContactBtn">Выход</button>
        </div>
      </div>
  `;
    modalContentEl.innerHTML = html;

    const replaceContactButtonEl = document.querySelector(".replaceContactBtn");
    const exitContactBtnEl = document.querySelector(".exitContactBtn");

    openModal();

    exitContactBtnEl.focus();

    replaceContactButtonEl.addEventListener("click", () => {
      listContacts = JSON.parse(fileContent);
      localStorage.setItem("contacts", JSON.stringify(listContacts));

      clearModal();
      closeModal();
      location.reload();
    });

    exitContactBtnEl.addEventListener("click", () => {
      clearModal();
      closeModal();
    });
  } else {
    //Вставляем в модальное окно сообщение, что не тот файл
    const html = `
      <h1 class="title">Данные можно загрузить только из файла:</h1>
      <h1 class="title">contactList.txt</h1>
      <div class="forma">
          
        <div class="blockButtons">
          <button class="btn exitContactBtn">ОК</button>
        </div>
      </div>
  `;
    modalContentEl.innerHTML = html;

    const exitContactBtn = document.querySelector(".exitContactBtn");

    openModal();

    exitContactBtn.focus();

    exitContactBtn.addEventListener("click", () => {
      clearModal();
      closeModal();
    });
  }
});

//Запись списка дел в файл
const savePlansFileButtonEl = document.querySelector(".savePlansFileButton");

savePlansFileButtonEl.addEventListener("click", async () => {
  const nameFile = "to-doList.txt";
  const fileData = JSON.stringify(listPlans);
  saveFile(nameFile, fileData);
});

//Запись списка контактов в файл
const saveContactsFileButtonEl = document.querySelector(
  ".saveContactsFileButton"
);

saveContactsFileButtonEl.addEventListener("click", () => {
  const nameFile = "contactList.txt";
  const fileData = JSON.stringify(listContacts);
  saveFile(nameFile, fileData);
});

//Запись данных в файл
const saveFile = async (nameFile, fileData) => {
  // настройки
  const optionsSave = {
    // рекомендуемое название файла
    suggestedName: nameFile,
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

  const fileHandle = await window.showSaveFilePicker(optionsSave);
  const writableStream = await fileHandle.createWritable();

  await writableStream.write(fileData);
  await writableStream.close();
};

//Добавление новой записи через клавишу insert
addEventListener("keydown", (event) => {
  if (event.code === "Insert") {
    //Вставляем в модальное окно вопрос о том что создать
    const html = `
      <h1 class="title">Выберите что создать?</h1>
      <div class="forma">

        <select class="selectNewEl" name="document" id="document">
          <option value="plan">Новое дело</option>
          <option value="contact">Новый контакт</option>
        </select>

        <div class="blockButtons">
          <button class="btn selectElementBtn">Выбрать</button>
          <button class="btn exitElementBtn">Выход</button>

        </div>

      </div>
      `;
    modalContentEl.innerHTML = html;

    openModal();
    document.querySelector(".selectNewEl").focus();

    const selectElementBtn = document.querySelector(".selectElementBtn");

    selectElementBtn.addEventListener("click", () => {
      const newElement = document.querySelector(".selectNewEl").value;

      clearModal();
      closeModal();

      if (newElement === "contact") {
        createNewContact();
      } else {
        createNewPlan();
      }
    });

    const exitElementBtnEl = document.querySelector(".exitElementBtn");

    exitElementBtnEl.addEventListener("click", () => {
      clearModal();
      closeModal();
    });
  } else {
    console.log(`else ${event.code}`);
  }
});
