import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { from, of } from 'rxjs';
import {map, mergeMap, catchError, withLatestFrom, concat, take} from 'rxjs/operators';
import { Pin } from '../interfaces/pin';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.scss']
})
export class PinListComponent implements OnInit {

  category: string;
  pins;
  name: string;
  pinObservable$;
  isMyPin: boolean;

  public myOptions: NgxMasonryOptions = {
  // transitionDuration: '0.8s',
  gutter: 8,
  columnWidth: 300,

};

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              public auth: AuthService) { }

  ngOnInit() {
      // this.pinObservable$ = this.route.params.pipe(
      //   mergeMap((params) => {
      //     console.log(params);
      //     this.category = params.category;
      //     if(!this.category) {
      //       return this.api.getAllPins();
      //     } else {
      //       return this.api.getPinsByCategory(this.category);
      //     }
      //  }),
      //   catchError(err => {throw(err)})
      // );

      this.pinObservable$ = this.route.url.pipe(
        mergeMap((segment) => {
          if (segment.length == 0) {
            this.isMyPin = false;
            return this.api.getAllPins();
          } else {
              const path = segment[0].path;
              const category = segment[1]? segment[1].path : "" ;
              const author = {
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email')
              }

              if(path=='pins') {
                this.isMyPin = false;
                if(category) {
                  return this.api.getPinsByCategory(category);
                } else {
                  return this.api.getAllPins();
                }
              } else if(path=='mypins') {
                  this.isMyPin = true;
                  if(category) {
                    return this.api.getMyPinsByCategory(author, category);
                  } else {
                    return this.api.getMyPins(author);
                  }
              }
          }

       }),
        catchError(err => {throw(err)})
      );

      this.pinObservable$.subscribe(pins => {
        //   this.pins = pins.map(pin => {
        //   let $key = pin.payload.key;
        //   let data = { $key, ...pin.payload.val() };
        //   return data;
        // })
        this.pins = pins;
      })
  }

  deletePin(pin) {
    if(confirm('Do you want to remove this pin ?')) {
      this.api.removePin(pin._id)
      .subscribe(result => {
        alert(result['message']);
        this.router.navigate(['/pins']);
      });
    }
  }

  overlayOn(i) {

    document.getElementById('bas_'+i)['style'].display = 'flex';
    document.getElementById('bas_'+i)['style']['justify-content'] = 'space-around';
    document.getElementById('haut_'+i)['style'].display = 'flex';
    document.getElementById('haut_'+i)['style']['justify-content'] = 'center';

  }

  overlayOff(i) {
    // document.getElementsByClassName('overlays').style.display = 'none';
    document.getElementById('bas_'+i)['style'].display = 'none';
    document.getElementById('haut_'+i)['style'].display = 'none';
    // document.getElementById('overlay2_'+i).style.display = 'none';
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

  ngOnDestroy() {
    this.pinObservable$.unsubscribe();
  }

}



