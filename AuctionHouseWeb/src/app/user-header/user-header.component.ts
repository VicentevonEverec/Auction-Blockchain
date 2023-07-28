import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';


import { StateService } from '../status-service.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})

export class UserHeaderComponent {
  
  constructor(private router: Router, protected stateService : StateService) {}

  

  async onLogin()
  {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    this.stateService.setAccount(await provider.send("eth_requestAccounts", []));
  }

  async onLogout() 
  {
    this.stateService.setAccount("");
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }

  onHowToSell(): void {
    this.router.navigate(['/how-to-sell']);
  }
}
