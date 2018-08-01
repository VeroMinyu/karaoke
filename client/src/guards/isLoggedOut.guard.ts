import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { SessionService } from "../services/session.service";

@Injectable()
export class IsLoggedOutGuardService implements CanActivate {
  
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.sessionService.isLogged().subscribe() ? false : true;

  }
}
