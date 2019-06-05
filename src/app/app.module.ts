import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { DomSanitizer } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

                 // Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

import 'hammerjs';

// TIERS Modules
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { NgxMasonryModule } from 'ngx-masonry';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

import { HeaderComponent } from './header/header.component';
import { PinListComponent } from './pin-list/pin-list.component';
import { PinAddComponent } from './pin-add/pin-add.component';
import { LoginComponent } from './login/login.component';
import { PinDetailComponent } from './pin-detail/pin-detail.component';
import { PinCategoryComponent } from './pin-category/pin-category.component';
import { MypinComponent } from './mypin/mypin.component'

export const firebaseConfig = {
    apiKey: "AIzaSyDYvij_tocZSOwoOiwJAayq3-w--DZVJRo",
    authDomain: "mypins-33ba6.firebaseapp.com",
    databaseURL: "https://mypins-33ba6.firebaseio.com",
    projectId: "mypins-33ba6",
    storageBucket: "mypins-33ba6.appspot.com",
    messagingSenderId: "1020610839704"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PinListComponent,
    PinAddComponent,
    LoginComponent,
    PinDetailComponent,
    PinCategoryComponent,
    MypinComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    NgMasonryGridModule,
    NgxMasonryModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }
}
