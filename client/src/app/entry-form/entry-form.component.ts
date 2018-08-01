import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { SongsService } from "../../services/songs.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-entry-form",
  templateUrl: "./entry-form.component.html",
  styleUrls: ["./entry-form.component.css"],
  providers: [SongsService]
})
export class EntryFormComponent implements OnInit {
  @Output() onChange = new EventEmitter();
  notFinished: boolean = false;
  error: string;

  constructor(public ss: SongsService, public router: Router) {}

  ngOnInit() {}

  submitForm(form) {
    let errors: boolean = false;
    this.error = "";

    if (form.controls.title.errors 
      || form.controls.artist.errors 
      || form.controls.youtube_url.errors 
      || form.controls.lyrics.errors) {
        this.error = "All fields are required.";
        errors = true;
      }

    if (!errors) {
      this.notFinished = true;
      this.ss
        .addSong({
          title: form.value.title,
          artist: form.value.artist,
          youtube_url: form.value.youtube_url,
          lyrics: form.value.lyrics
        })
        .subscribe(() => {
          this.onChange.emit();
          this.notFinished = false;
        });
    }
  }
}
