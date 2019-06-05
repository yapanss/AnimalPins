import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// import { Pin } from './interfaces/pin';
// import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pin-add',
  templateUrl: './pin-add.component.html',
  styleUrls: ['./pin-add.component.scss']
})
export class PinAddComponent implements OnInit {
  constructor (private api: ApiService,
               private router: Router) {}

  categories: string[] = ["Amphibians", "Birds", "Fishes", "Mamals", "Reptiles"];

   pin = {
    title: "",
    link: "",
    category: "",
    likers: [],
    comments: [],
    author: {
      email: "",
      name: "",
      avatar: ""
    }
  }

  ngOnInit() {
  }

   createPin() {
    this.pin['createdAt'] = Date.now();
    this.pin['author'] = {
      email: localStorage.getItem('email'),
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
    }

    this.api.postPin(this.pin)
    .subscribe(pin => {
      console.log(pin);
      this.router.navigate(['/pins']);
    })

  }

}
