import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { SongsListComponent } from "./songs-list/songs-list.component";
import { SongComponent } from "./song/song.component";
import { EntryFormComponent } from "./entry-form/entry-form.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "karaoke", component: SongsListComponent },
  { path: "karaoke/form/:artist/:id/:title", component: EntryFormComponent},
  { path: "karaoke/:id", component: SongComponent }
];
