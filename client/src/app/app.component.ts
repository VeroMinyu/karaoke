import { Component, Renderer2 } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router, NavigationStart } from '../../node_modules/@angular/router';
import { PerformanceService } from '../services/performances.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public sessionService: SessionService, public performanceService: PerformanceService, public router: Router, public renderer: Renderer2) {

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.renderer.removeClass(document.getElementById("header"), "hide");
          this.renderer.removeClass(document.getElementById("header"), "white-bg");
          
          if (event.url === "/") {
            this.renderer.addClass(document.getElementById("header"), "hide");
          } else if (event.url === "/login" || event.url === "/signup") {
            this.renderer.addClass(document.getElementById("header"), "white-bg");
          }
        }
      });
  }

  logout() {
    this.sessionService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
    return false;
  }
}
