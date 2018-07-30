import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private sessionService: SessionService, private router: Router) { }

  logout() {
    this.sessionService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
    return false;
  }
}
