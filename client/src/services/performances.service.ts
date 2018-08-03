import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../environments/environment";

import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { of } from "rxjs";

const { BASEURL } = environment;

@Injectable()
export class PerformanceService {
  options: object = { withCredentials: true };

  constructor(private http: Http) {}

  getPerformances(): Observable<Array<object>> {
    return this.http.get(`${BASEURL}/api/performance`, this.options).pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  getPerformance(id): Observable<any> {
    return this.http.get(`${BASEURL}/api/performance/${id}`, this.options).pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  addPerformance(user: string, song: string, video: any) {
    const fd = new FormData();
    fd.append('user', user);
    fd.append('song', song);
    fd.append('video', video);

    return this.http.post(`${BASEURL}/api/performance`, fd, this.options).pipe(
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
