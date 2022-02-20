import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {
 
  constructor(private authservice : AuthService,
              private router : Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
     
      return this.authservice.verifyAuthentication()
              .pipe(
                tap(isAuthenticated =>{ 
                  if(!isAuthenticated){
                    this.router.navigate(['./auth/login'])
                  }
                })
              )

      // if(this.authservice.auth.id){
      //   return true
      // }
  
      // console.log('bloquado por el auth guard CanActivated');
     
      // return false;
  }

  canLoad(route: Route, 
    segments: UrlSegment[]): Observable<boolean> |  Promise<boolean> |boolean {
    
      return this.authservice.verifyAuthentication()
      .pipe(
        tap(isAuthenticated =>{ 
          if(!isAuthenticated){
            this.router.navigate(['./auth/login'])
          }
        })
      )
    // if(this.authservice.auth.id){
    //   return true
    // }

    // console.log('bloquado por el auth guard - CanLoad');
   
    // return false;
  }
  
}
