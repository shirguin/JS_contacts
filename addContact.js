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

//Переход на главную
exitButtonEl.addEventListener("click", () => {
  window.location.replace("./index.html");
});
