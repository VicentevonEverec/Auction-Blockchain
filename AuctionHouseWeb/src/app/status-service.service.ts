import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService 
{
  private account : string = "";

  constructor() {}

  getAccount() : string
  {
    return this.account;
  }

  setAccount(account : string) : void
  {
    this.account = account;
  }
}
