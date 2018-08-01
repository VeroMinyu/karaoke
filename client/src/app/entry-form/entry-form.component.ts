import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
  providers: [SongsService]
})
export class EntryFormComponent implements OnInit {
  @Output() onChange = new EventEmitter();

  notFinished: boolean = false;
  constructor(public ss: SongsService, public router: Router) { }

  ngOnInit() {
  }

  submitForm(form){
    this.notFinished = true;
    this.ss.addSong({title: form.value.title, artist: form.value.artist, youtube_url: form.value.youtube_url, lyrics: form.value.lyrics})
    .subscribe(()=>{
      this.onChange.emit();
      this.notFinished=false;
    })
  }

}
