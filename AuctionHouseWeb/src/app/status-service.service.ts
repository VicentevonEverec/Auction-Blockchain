import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class StateService 
{
  userData = {
    name: "",
    surname: "",
    email: "",
    dni: "",
    account: ""
  }

  constructor() {}

  getAccount() : string
  {
    return this.userData.account;
  }

  // Creamos una función para que al mostrar la cartera se vea como se ve en todos los sitios sin mostrar todo el código
  getAccountToShow() : string
  {
    return this.userData.account.substring(0, 6) + "..." + this.userData.account.substring(this.userData.account.length - 4);
  }

  setAccount(account : string) : void
  {
    this.userData.account = account;
  }

  getDni() : string
  {
    return this.userData.dni;
  }

  setDni(dni : string) : void
  {
    this.userData.dni = dni;
  }

  getEmail() : string
  {
    return this.userData.email;
  }

  setEmail(email : string) : void
  {
    this.userData.email = email;
  }

  getName() : string
  {
    return this.userData.name;
  }

  setName(name : string) : void
  {
    this.userData.name = name;
  }

  getSurname() : string
  {
    return this.userData.surname;
  }

  setSurname(surname : string) : void
  {
    this.userData.surname = surname;
  }

  setUserData(userData : any) : void
  {
    this.setName(userData.name);
    this.setSurname(userData.surname);
    this.setEmail(userData.email);
    this.setDni(userData.dni);
  }

  cleanUserData() : void
  {
    this.setName("");
    this.setSurname("");
    this.setEmail("");
    this.setDni("");
    this.setAccount("");
  }

  getUserData() : any
  {
    return this.userData;
  }
}
