'use strict'

// search elements
const form = document.querySelector(`.contact-form`);
const ul = document.querySelector(`.contacts-list`);
const inputName = document.getElementById(`name`);
const inputPhone = document.getElementById(`phone`);
const inputAddress = document.getElementById(`address`);
const inputEmail = document.getElementById(`email`);

const value = ``;


// local storage
class Storage {
  static addToStorage(contactsList) {
    const storage = localStorage.setItem(`user`, JSON.stringify(contactsList));
    return storage;
  }

  static getStorage() {
    const storage = localStorage.getItem(`user`) === null ?
      [] : JSON.parse(localStorage.getItem(`user`));
    return storage;
  }
}


// empty contactsList (array)

let contactsList = Storage.getStorage();

// form
form.addEventListener(`submit`, (e) => {
  e.preventDefault();

  // create id and search input value
  const id = (Math.floor(Math.random() * 10000000));
  const data = {
    name: inputName.value,
    phone: inputPhone.value,
    email: inputEmail.value,
    address: inputAddress.value,
  };

  if (inputName.value && inputPhone.value &&
    inputEmail.value && inputAddress.value !== value) {


    // add new user to list
    const user = new User(id, data);
    contactsList = [...contactsList, user];


    // show contact
    Form.displayContact();
    Form.clearForm();

    // delete contact from DOM
    Contacts.removeContact();

    // add To Storage
    Storage.addToStorage(contactsList);
  }
});


// create data user

class User {

  constructor(id, data) {
    this.setId(id);
    this.setData(data);
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getData() {
    return this._data;
  }

  setData(data) {
    this._data = data;
  }
}

// show contact

class Form {

  static displayContact() {
    const displayContact = contactsList.map((elem) => {
      return `
      <li class="contacts-list__item" >
      <div>
      <span class="contacts-list__span"><b>${elem._data.name}</b></span>
      <span class="contacts-list__span">${elem._data.phone}</span>
      <span class="contacts-list__span">${elem._data.email}</span>
      <span class="contacts-list__span">${elem._data.address}</span>
      </div>
      <span class="remove" id="${elem._id}">&#10008;</span> 
  </li> 
      `
    });

    ul.innerHTML = (displayContact).join(` `);

  }

  static clearForm() {
    inputName.value = ``;
    inputPhone.value = ``;
    inputEmail.value = ``;
    inputAddress.value = ``;
  }
}


class Contacts {

  static removeContact() {
    ul.addEventListener(`click`, (e) => {
      if (e.target.classList.contains(`remove`)) {
        e.target.parentElement.remove();
      }
      const buttonRemove = e.target.id;
      Contacts.removeArrayContact(buttonRemove);
    })
  };

  static removeArrayContact(id) {
    contactsList = contactsList.filter((item) => item._id !== Number(id));
    Storage.addToStorage(contactsList);
  }
}



document.addEventListener('DOMContentLoaded', () => {

  Form.displayContact();
  Contacts.removeContact();

})


// coocie  

document.cookie = `storageExpiration=10_days; max-age=864000`;

const timeClear = 864000;                
const now = new Date().getTime();
const setupTime = localStorage.getItem('setupTime');

if (setupTime === null) {
    localStorage.setItem('setupTime', now)
} else {
    if(now - setupTime > timeClear * 1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
    }
}


