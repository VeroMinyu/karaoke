import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SessionService } from "../services/session.service";
import { map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable()
export class IsLoggedInGuardService implements CanActivate {
  
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.sessionService.isLoggedGuard().pipe(
      map((res: Response) => {
        const user = res.json();
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(e => {
        this.router.navigate(['/login']);
        return of(false);
      })
    )
  }
}
