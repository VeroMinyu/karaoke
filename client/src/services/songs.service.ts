import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../environments/environment";

import { map, catchError } from "rxjs/operators";
import { Observable } from "../../node_modules/rxjs";
import { of } from "rxjs";

const { BASEURL } = environment;

interface User {
  username: string;
}

@Injectable()
export class SongService {
  options: object = { withCredentials: true };

  constructor(private http: Http) {}

  getSongs(): Observable<Array<object>> {
    return this.http.get(`${BASEURL}/api/songs`, this.options).pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  getSong(id): Observable<object> {
    return this.http.get(`${BASEURL}/api/songs/${id}`, this.options).pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  addSong(song: any): Observable<object> {
    return this.http.post(`${BASEURL}/api/songs`, song, this.options).pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => {
          of(this.errorHandler(e));
          throw new Error(e.json().message);
        })
      );
  }

  errorHandler(e) {
    console.log("SessionServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }
}
