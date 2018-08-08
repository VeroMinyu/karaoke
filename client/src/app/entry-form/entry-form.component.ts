import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { SongsService } from "../../services/songs.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-entry-form",
  templateUrl: "./entry-form.component.html",
  styleUrls: [
    './entry-form.component.css',
    '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
  ],
  providers: [SongsService]
})
export class EntryFormComponent implements OnInit {
  @Output() onChange = new EventEmitter();
  error: string;

  title: string = "";
  artist: string = "";
  youtube_url: string = "";
  lyrics: string = "";

  redirect: boolean = false;

  notFinished: boolean = false;
  constructor(
    public ss: SongsService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.artist && params.id && params.title) {
        this.redirect = true;
        this.title = params.title;
        this.artist = params.artist;
        this.youtube_url = `https://www.youtube.com/watch?v=${params.id}`;
      }
    });
  }

  submitForm(form) {
    let errors: boolean = false;
    this.error = "";

    if (
      form.controls.title.errors ||
      form.controls.artist.errors ||
      form.controls.youtube_url.errors ||
      form.controls.lyrics.errors
    ) {
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
        .subscribe(song => {
          if (this.redirect) {
            this.router.navigate(["/karaoke", song._id]);
          } else {
            this.onChange.emit();
            this.notFinished = false;
          }
        });
    }
  }
}
