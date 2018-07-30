import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error: string;
  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit() {}

  signup(username: string, password: string) {
    this.sessionService.signup(username, password).subscribe(
      user => {
        this.router.navigate(['/']);
      },
      err => {
        this.error = err.message;
      }
    );
  }
}