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
        <img class="icon" src="./edit.svg" alt="iconedit" />
        <img class="icon" src="./delete.svg" alt="iconedit" />
    `;
  divContactsEl.append(newContactEl);
});

const addButtonEl = document.querySelector(".addContact");

addButtonEl.addEventListener("click", () => {
  window.location.replace("./addContact.html");
});
