import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

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

  private walletSubject = new BehaviorSubject<string>('');

  wallet$ = this.walletSubject.asObservable();

  constructor() {
    // Al iniciar el servicio, intenta cargar la cartera desde Local Storage
    this.loadWallet();
  }

  setWallet(wallet: string): void {
    // Actualizar la cartera en el BehaviorSubject y guardar en Local Storage
    this.walletSubject.next(wallet);
    this.saveWallet(wallet);
  }

  private loadWallet() {
    const storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      // Cargar la cartera desde Local Storage
      this.walletSubject.next(storedWallet);
    }
  }

  private saveWallet(wallet: string) {
    // Guardar la cartera en Local Storage
    localStorage.setItem('wallet', wallet);
  }

  getAccount(): string {
    // Obtener el valor de la cartera desde el BehaviorSubject
    return this.walletSubject.value;
  }

  getAccountToShow(): string {
    const wallet = this.walletSubject.value;
    // Modificar el valor de la cartera para mostrarlo como se desea
    return wallet.substring(0, 6) + '...' + wallet.substring(wallet.length - 4);
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
    this.setWallet("");
  }

  getUserData() : any
  {
    return this.userData;
  }
}
