import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import * as Parse from 'parse';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticatedGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (Parse.User.current()) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}
