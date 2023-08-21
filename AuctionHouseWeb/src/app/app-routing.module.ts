import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HowToSellComponent } from './how-to-sell/how-to-sell.component';
import { RegisterComponent } from './register/register.component';

import { ProfileComponent } from './profile/profile.component';
import { WalletHistoryComponent } from './wallet-history/wallet-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'how-to-sell', component: HowToSellComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'wallet-history', component: WalletHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
