import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Wallet, ethers } from 'ethers';
import { StateService } from '../status-service.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-change-wallet',
  templateUrl: './change-wallet.component.html',
  styleUrls: ['./change-wallet.component.scss']
})
export class ChangeWalletComponent {
  
    constructor(protected router: Router, private http: HttpClient, private stateService : StateService) { }
  
    walletHistory: string[] = [];

    changeWalletInfo = {
    currentWallet : this.stateService.getAccount(),
    walletAddress: ""
    }
  
    ngOnInit() {
      this.http.get<string[]>(`/api/wallet-history/${this.stateService.getAccount()}`, { responseType: 'json' })
        .subscribe({
          next: walletHistoryRetrieved => {
            console.log('Historial de carteras:', walletHistoryRetrieved);
            
            this.walletHistory = walletHistoryRetrieved;
          },
          error: error => 
          {
            console.log('Error al recuperar el historial de carteras', error);
            window.alert("No se pudo recuperar el historial de carteras."); // Manejo de error
          }
        });
    }

    changeWallet(wallet : string): void
    {
      const confirmacion = confirm("¿Estás seguro de que quieres que esta cartera sea tu principal?");
      if (!confirmacion) {
        this.router.navigate(['/wallet-management']);
      }
  
      this.changeWalletInfo.walletAddress = wallet;

      //Los datos que enviamos
      console.log(this.changeWalletInfo.walletAddress);
  
      this.http.post('/api/changeWallet', this.changeWalletInfo, { responseType: 'text' })
      .subscribe({
        next: response => {
          console.log('Cartera cambiada correctamente: ', response);
          window.alert('Cartera cambiada correctamente: ' + response);
          this.stateService.setWallet(this.changeWalletInfo.walletAddress);
          // Recargar la página para que se actualice el historial de carteras
          window.location.reload();
        },
        error: error => 
        {
          console.error('Error al cambiar la cartera: ', error);
          window.alert('Error al cambiar la cartera: ' + error.error);
        }
      });
  
    }
  
    isAutofillEnabled: boolean = false;
  
    async autofillWallet() 
    {
      this.isAutofillEnabled = true;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const account =  await provider.send("eth_requestAccounts", []);
      this.changeWalletInfo.walletAddress = account[0];
      this.isAutofillEnabled = false;
    }
}
