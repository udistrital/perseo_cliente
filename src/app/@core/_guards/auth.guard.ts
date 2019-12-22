import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

      let valid: boolean =  true;
      const roles = route.data['roles'] as Array<string>;
      console.info(`${route}`);
      console.info(`${state}`);
      const id_token = window.localStorage.getItem('id_token').split('.');
      // console.info(id_token);
      const payload = JSON.parse(atob(id_token[1]));
      console.info(payload);

      // if (payload && payload.role) {
      //   for ( let i = 0; i < payload.role.length; i++) {
      //     for ( let j = 0; j < roles.length; j++) {
      //         if ( payload.role[i] === roles[j]) {
      //             valid = true;
      //             break;
      //         }
      //     }
      //   }
      // }

      // if (!valid) {
      //   // not logged in so redirect to login page with the return url
      //   // or not exist role return url
      //   this.router.navigate(['/']);
      // }

      return Observable.of(valid);
      // return valid;
  }

  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //     return this.canActivate(route, state);
  // }

}
