import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error: string;
  constructor(private sessionService: SessionService, private router: Router) { }

  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/api/auth/signup`,
    method: 'POST'
  });

  feedback;

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  signup(username: string, password: string) {
    this.error = "";

    if (!username || !password) {
      this.error = "All fields are required.";
    } else if (password.length < 4) {
      this.error = "Password should has at least 4 characters.";
    } else if (username.length < 4) {
      this.error = "Username should has at least 4 characters.";
    } else {
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('username', username);
        form.append('password', password);
      };
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = () => {
        this.router.navigate(['/']);
      };
    }
  }
}