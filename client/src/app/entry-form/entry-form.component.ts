import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
  providers: [SongsService]
})
export class EntryFormComponent implements OnInit {
  @Output() onChange = new EventEmitter();

  title: string = "";
  artist: string = "";
  youtube_url: string = "";

  redirect : boolean = false;

  notFinished: boolean = false;
  constructor(public ss: SongsService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.artist && params.id && params.title){
        this.redirect = true;
        this.title = params.title;
        this.artist = params.artist;
        this.youtube_url = `https://www.youtube.com/watch?v=${params.id}`
      }
    })
  }

  submitForm(form){
    this.notFinished = true;
    this.ss.addSong({title: form.value.title, artist: form.value.artist, youtube_url: form.value.youtube_url, lyrics: form.value.lyrics})
    .subscribe((song)=>{
      if (this.redirect){
        this.router.navigate(['/karaoke', song._id])
      } else{
        this.onChange.emit();
        this.notFinished=false;
      }
    })
  }

}
