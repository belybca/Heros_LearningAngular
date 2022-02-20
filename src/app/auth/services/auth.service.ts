import {  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interfaces';
import { tap, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiEndPoint: string = environment.apiEndPoint;
  private _auth: Auth | undefined;

  get auth(){
    return { ...this._auth}
  }
  
  constructor(private http : HttpClient) {   }

  login(){
    return this.http.get<Auth>(`${ this.apiEndPoint}/usuarios/1`)
      .pipe(
        tap(resp =>this._auth = resp),
        tap(auth => localStorage.setItem('id',auth.id))
      );
    ;
  }
  logout(){ 
    this._auth = undefined;
  }

  verifyAuthentication() : Observable<boolean>{
      if(!localStorage.getItem('id')){
        return of(false);
      }
      return  this.http.get<Auth>(`${ this.apiEndPoint}/usuarios/1`)
      .pipe(
        map(auth => {
        // console.log('map', auth);
        this._auth = auth;
          return true;
          
        })
      );
  }
  
}
