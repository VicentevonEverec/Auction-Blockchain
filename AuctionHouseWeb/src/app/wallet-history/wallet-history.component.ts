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

  currentWallet = this.stateService.getAccount();
  walletHistory: string[] = [];

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


}
