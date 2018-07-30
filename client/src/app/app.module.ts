import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { routes } from './routes'
import { RouterModule } from '../../node_modules/@angular/router';

import { FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SessionService } from '../services/session.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
