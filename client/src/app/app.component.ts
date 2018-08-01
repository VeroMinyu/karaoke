import { Component, Renderer2 } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router, NavigationStart } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private sessionService: SessionService, private router: Router, private renderer: Renderer2) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (event.url === "/") {
            this.renderer.addClass(document.getElementById("header"), "hide");
          } else {
            this.renderer.removeClass(document.getElementById("header"), "hide");
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
