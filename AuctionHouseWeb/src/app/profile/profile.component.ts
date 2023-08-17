import { Component, OnInit } from '@angular/core';
import { StateService } from '../status-service.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent 
{
  constructor(protected stateService : StateService, protected http : HttpClient) {}

  ngOnInit() {
    this.http.get(`/api/recover-user-data/${this.stateService.getAccount()}`, { responseType: 'json' })
    .subscribe({
      next: userData => {
        console.log('Datos de usuario recuperados:', userData);
        
        this.stateService.setUserData(userData);
      },
      error: error => 
      {
        console.log('Error al recuperar datos de usuario', error);
        window.alert("No se pudieron recuperar los datos del usuario."); // Manejo de error
      }
    });
  }
}
