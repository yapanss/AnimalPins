import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  pinsRef: AngularFireList<any>;      // Reference to pins list, Its an Observable
  pinRef: AngularFireObject<any>;     // Reference to pin object, Its an Observable too
  baseUrl: string = '/api/pin/';
  constructor(private db: AngularFireDatabase,
              private http: HttpClient) {} // Inject AngularFireDatabase dependency in constructor

   // Read pins List
  // getAllPins() {
  //   this.pinsRef = this.db.list('pin');
  //   return this.pinsRef;
  // }
  // getPinsByCategory(category) {
  //   this.pinsRef = this.db.list('pin', ref => ref.orderByChild('category').equalTo(category));
  //   return this.pinsRef;
  // }

  // getPin(key) {
  //   this.pinRef = this.db.object('pin/'+key);
  //   console.log(this.pinRef);
  //   return this.pinRef;
  // }

  // postPin(data) {
  //   this.pinsRef.push(data);
  // }

  // updatePinAfterLike(key, likers) {
  //   this.pinRef = this.db.object('pin/'+key);
  //   this.pinRef.update({
  //     likers: likers
  //   })
  // }

  // updatePinAfterComment(key, comments) {
  //   this.pinRef = this.db.object('pin/'+key);
  //   this.pinRef.update({
  //     comments: comments
  //   })
  // }

  // removePin(key) {
  //   this.pinRef = this.db.object('pin/'+key);
  //   this.pinRef.remove();
  // }


/* ******************************************************
         QUERY FROM   MONGODB DB
******************************************************* */


  // Read pins List
  getAllPins() {
    return this.http.get('/api/pin');
  }
  getPinsByCategory(category) {
    return this.http.get('/api/pin?category='+category);
  }
  getMyPins(author) {
    console.log(author);
    const nameAndEmail = JSON.stringify(author);
    return this.http.get(`/api/mypins?author=${nameAndEmail}`);
  }
  getMyPinsByCategory(author,category) {
    const nameAndEmail = JSON.stringify(author);
    return this.http.get(`/api/mypins?author=${nameAndEmail}&category=${category}`)
  }
  getPin(key) {
    return this.http.get('/api/pin/'+key);
  }

  postPin(data) {
    let body = JSON.stringify(data);
    return this.http.post('/api/pin', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })

  }

  updatePin(key, likers, action) {
    const body = {
      action: action,
      data: likers
    }
    return this.http.put('/api/pin/'+key, body);
  }

  removePin(key) {
    return this.http.delete('/api/pin/'+key);
  }
}
