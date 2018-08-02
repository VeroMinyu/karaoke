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
import { SongsListComponent } from './songs-list/songs-list.component';
import { SongComponent } from './song/song.component';
import { FilterPipe } from './pipes/filter.pipe';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { LoadingComponent } from './loading/loading.component';
import { IsLoggedOutGuardService } from "../guards/isLoggedOut.guard";
import { IsLoggedInGuardService } from "../guards/isLoggedIn.guard";
import { TestVideoComponent } from './test-video/test-video.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    SongsListComponent,
    SongComponent,
    FilterPipe,
    EntryFormComponent,
    LoadingComponent,
    TestVideoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [
    SessionService,
    IsLoggedInGuardService,
    IsLoggedOutGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
