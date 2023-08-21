import { Component } from '@angular/core';
import { StateService } from '../status-service.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.scss']
})
export class WalletHistoryComponent 
{
  constructor(protected stateService : StateService, protected http : HttpClient) { }

  walletHistory = [];
  currentWallet : String = "";

  ngOnInit()
  {
    this.http.get(`/api/wallet-history/${this.stateService.getDni()}`, { responseType: 'json' })
    .subscribe({
      next: walletHistory => {
        console.log('Hisotiral de carteras:', walletHistory);
        
        this.stateService.setUserData(walletHistory);
      },
      error: error => 
      {
        console.log('Error al recuperar el historial de carteras', error);
        window.alert("No se pudo recuperar el historial de carteras."); // Manejo de error
      }
    });
  }

}
