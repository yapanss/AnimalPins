import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import {map, mergeMap, catchError} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pin-detail',
  templateUrl: './pin-detail.component.html',
  styleUrls: ['./pin-detail.component.scss']
})
export class PinDetailComponent implements OnInit {
pin;
key;
title;
comment = {
};
commentContent: string = "";
commentBoxIsOpen: boolean = false;

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private auth : AuthService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .pipe(
        mergeMap((params) => {
          console.log(params.key);
          this.key = params.key;
         return this.api.getPin(this.key);
       }),
        catchError(err => {throw(err)})
      ).subscribe(pin => {
       this.pin = pin;
       let l = this.pin.comments.length;
       this.title = l < 2 ? `${l} comment` : `${l} comments`;
       console.log(this.pin);
      });
  }

  removeItem() {
    if(confirm('Do you really want to delete this pin ?')) {
      this.api.removePin(this.key)
      .subscribe(result => {
        console.log(result['pin']);
        alert(result['message']);
        this.router.navigate(['/']);
      });

    }
  }

  toggleCommentBox() {
    if(!this.auth.isAuthenticated()) {
      alert('Please sign in before you can add a comment !')
    } else {
        this.commentBoxIsOpen = !this.commentBoxIsOpen;
    }
  }
  addComment() {
    console.log(this.comment);
    const name = localStorage.getItem('name') || '';
    const avatar = localStorage.getItem('avatar');
    this.comment['author'] = name;
    this.comment['avatar'] = avatar;
    this.comment['createdAt'] = Date.now();
    this.pin.comments.push(this.comment);
    console.log('pin.comments : ', this.pin.comments);
    this.api.updatePin(this.pin._id, this.pin.comments, 'comments')
    .subscribe(pin => {
      this.pin = pin;
       let l = this.pin.comments.length;
      this.title = l < 2 ? `${l} comment` : `${l} comments`;
      console.log(pin);
      this.comment = {};
    })
  }

  like(pin) {
    if (!this.auth.isAuthenticated()) {
      alert('Please sign in before you can like this pin !')
    } else {
        const email = localStorage.getItem('email');
          if(pin.likers.indexOf(email)==-1) {
            pin.likers.push(email);
            console.log(pin.likers);
          } else {
            const index = pin.likers.indexOf(email);
            pin.likers = pin.likers.filter(item => item != email);
            console.log(pin.likers);
          }
          this.api.updatePin(pin._id, pin.likers, 'likers')
          .subscribe(pin => {
            console.log(pin);
          })
    }

  }
  isLikedBy(likers, email) {
    return likers.indexOf(email) !=-1;
  }

  // getCommentTime(commentDate) {
  //   let date = new Date(commentDate);
  //   var t = Date.now()-date.getTime();
  //   console.log(date)
  //   var time = Math.floor(t/1000);
  //   if(time>=0 && time<59) {
  //     return `${time} sec`;
  //   } else {
  //       time = Math.floor(t/60000);
  //       if(time>0 && time<60) {
  //         return `${time} min`;
  //       } else {
  //         time = Math.floor(t/3600000);
  //         if(time>0 && time <24) {
  //           return `${time} hrs`;
  //         } else {
  //           time = Math.floor(t/86400000);
  //           console.log(time);
  //           return `${time} days`;
  //         }
  //       }
  //   }
  // }

}






