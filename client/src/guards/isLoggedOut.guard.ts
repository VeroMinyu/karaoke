import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SessionService } from "../services/session.service";
import { map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable()
export class IsLoggedOutGuardService implements CanActivate {
  
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.sessionService.isLoggedGuard().pipe(
      map((res: Response) => {
        const user = res.json();
        if (user) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      }),
      catchError(e => {
        return of(true);
      })
    )
  }
}
