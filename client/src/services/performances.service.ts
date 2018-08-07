import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../environments/environment";

import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { of } from "rxjs";

import * as io from 'socket.io-client';
import { SessionService } from "./session.service";

const { BASEURL } = environment;

@Injectable()
export class PerformanceService {
  options: object = { withCredentials: true };
  socket: SocketIOClient.Socket;
  notification: string;

  constructor(private http: Http, private sessionService: SessionService) {
    // Connect to websocket
    this.socket = io(BASEURL);
    this.socket.on('connect', () => console.log("Connected to WS"));

    this.socket.on('newPerformanceNotification',(data) => {
      this.sessionService.isLogged().subscribe(user => {
        if (user && user.following.includes(data.user.id)) {
          this.notification = data;
          setTimeout(() => {
            this.notification = null;
          }, 6000);
        }
      });
    });
  }

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

  getUserPerformances(): Observable<Array<object>> {
    return this.http.get(`${BASEURL}/api/performance/user`, this.options).pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  addPerformance(user: string, song: string, video: any, screenShot: any) {
    const fd = new FormData();
    fd.append('user', user);
    fd.append('song', song);
    fd.append('video', video);
    fd.append('screenShot', screenShot);

    return this.http.post(`${BASEURL}/api/performance`, fd, this.options).pipe(
      map((res: Response) => {
        const performance = res.json();
        this.socket.emit('newPerformanceNotification', { 
          user: performance.user,
          video: performance._id
        });

        return performance;
      }),
      catchError(e => {
        of(this.errorHandler(e));
        throw new Error(e.json().message);
      })
    );
  }

  removePerformance(id: string): Observable<object> {
    return this.http.delete(`${BASEURL}/api/performance/${id}`, this.options).pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  addComment(comment:string, performanceId:string, userId:string): Observable<object>{
    return this.http.post(`${BASEURL}/api/comments`, {comment, performanceId, userId}, this.options).pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(e => of(this.errorHandler(e)))
    )
  }

  errorHandler(e) {
    console.log("SessionServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }
}
