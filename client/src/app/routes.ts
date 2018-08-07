import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { SongsListComponent } from "./songs-list/songs-list.component";
import { SongComponent } from "./song/song.component";
import { EntryFormComponent } from "./entry-form/entry-form.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { PerformancesComponent } from "./performances/performances.component";
import { PerformanceDetailComponent } from "./performance-detail/performance-detail.component";
import { ProfileComponent } from "./profile/profile.component";
import { IsLoggedInGuardService } from "../guards/isLoggedIn.guard";
import { IsLoggedOutGuardService } from "../guards/isLoggedOut.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signup", component: SignupComponent, canActivate: [IsLoggedOutGuardService] },
  { path: "login", component: LoginComponent, canActivate: [IsLoggedOutGuardService] },
  { path: "karaoke", component: SongsListComponent, canActivate: [IsLoggedInGuardService] },
  { path: "karaoke/form/:artist/:id/:title", component: EntryFormComponent, canActivate: [IsLoggedInGuardService] },
  { path: "karaoke/:id", component: SongComponent, canActivate: [IsLoggedInGuardService] },
  { path: "performances", component: PerformancesComponent, canActivate: [IsLoggedInGuardService]  },
  { path: "performances/:id", component: PerformanceDetailComponent, canActivate: [IsLoggedInGuardService]  },
  { path: "profile", component: ProfileComponent, canActivate: [IsLoggedInGuardService]  },
  { path: "error", component: NotfoundComponent },
  { path: "**", redirectTo: "/error" }
];
