import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SessionService } from "../services/session.service";
import { Observable } from "rxjs";

@Injectable()
export class IsLoggedInGuardService implements CanActivate {
  
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): boolean {
    return true;

    // return this.sessionService.isLogged();

    // if (typeof this.sessionService.user === "undefined") {
    //   this.router.navigate(['/']);

    //   return false;
    // } else {
    //   return true;
    // }
  }
}
