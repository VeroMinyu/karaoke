import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../environments/environment";

import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { of } from "rxjs";

const { BASEURL } = environment;

interface User {
  _id?: string;
  username: string;
  profilePic: string;
  following?: Array<any>;
}

@Injectable()
export class SessionService {
  user: User;

  options: object = { withCredentials: true };

  constructor(private http: Http) {
    this.isLogged().subscribe();
  }

  isLogged(): Observable<User> {
    return this.http.get(`${BASEURL}/api/auth/currentuser`, this.options).pipe(
      map((res: Response) => {
        this.user = res.json();
        return this.user;
      }),
      catchError(e => of(null))
    );
  }

  isLoggedGuard() {
    return this.http.get(`${BASEURL}/api/auth/currentuser`, this.options);
  }

  login(username: string, password: string): Observable<object> {
    return this.http.post(`${BASEURL}/api/auth/login`, { username, password }, this.options).pipe(
      map((res: Response) => {
        let user = res.json();
        this.user = user;
        return this.user;
      }),
      catchError(e => {
        of(this.errorHandler(e));
        throw new Error(e.json().message);
      })
    );
  }

  toggleSubscribe(userId) {
    return this.http.post(`${BASEURL}/api/auth/subscribe`, { userId }, this.options).pipe(
      map((res: Response) => {
        let user = res.json();
        this.user = user;
        return this.user;
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  getSubscriptions() {
    return this.http.get(`${BASEURL}/api/auth/subscriptions`, this.options).pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  logout() {
    return this.http.get(`${BASEURL}/api/auth/logout`, this.options).pipe(
      map((res: Response) => {
        this.user = null;
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  errorHandler(e) {
    console.log("SessionServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }
}
