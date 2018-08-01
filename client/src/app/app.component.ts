import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeader: boolean = true;

  constructor(private sessionService: SessionService, private router: Router) {
    // if (this.router.url === "/") {
    //   this.showHeader = false;
    // }
  }

  logout() {
    this.sessionService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
    return false;
  }
}
