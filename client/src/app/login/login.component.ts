import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  error: string;
  username: string;
  password: string;
  constructor(public sessionService: SessionService, public router: Router) {}

  ngOnInit() {}

  login(username: string, password: string) {
    this.error = "";
    
    if (!username || !password) {
      this.error = "All fields are required.";
    } else {
      this.sessionService.login(username, password).subscribe(
        user => {
          this.router.navigate(['/']);
        },
        err => {
          this.error = err.message;
        }
      );
    }
  }
}