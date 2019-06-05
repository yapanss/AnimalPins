import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PinListComponent } from './pin-list/pin-list.component'
import { PinAddComponent } from './pin-add/pin-add.component'
import { LoginComponent } from './login/login.component'
import { PinDetailComponent } from './pin-detail/pin-detail.component'
import { MypinComponent } from './mypin/mypin.component'

const routes: Routes = [
  {path: '', component: PinListComponent},
  {path: 'pins', component: PinListComponent},
  {path: 'pin/:key', component: PinDetailComponent},
  {path: 'pins/:category', component: PinListComponent},
  {path: 'mypins', component: PinListComponent},
  {path: 'mypins/:category', component: PinListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new', component: PinAddComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
