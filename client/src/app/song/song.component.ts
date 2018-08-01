import { Component, OnInit, ViewChild } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { ActivatedRoute } from '@angular/router';
import { environment} from "../../environments/environment"

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: [
    './song.component.css',
    '../../../node_modules/font-awesome/css/font-awesome.min.css'
  ],
  providers: [SongsService]
})
export class SongComponent implements OnInit {
  song: any;
  recommendations : any;
  
  @ViewChild('videoPlayer') videoplayer: any;
  videoSource: string = "";
  pauseClass: string = "fa-play-circle";

  interval: any;
  currentTime: number = 0;
  line1: string = "";
  line2: string = "";
  lyrics: Array<any>;

  constructor(private songsService: SongsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.songsService.getSong(params.id).subscribe(song => {
        this.song = song;
        this.videoSource = `${environment.videoURL}${song.video_name}`;
        this.lyrics = this.song.lyrics;

        this.songsService.getRecommendations(this.song.artist).subscribe(list=>{
          this.recommendations=list;
          console.log(list)
        }) 
      });


    });
  }

  toggle() {
    if (this.videoplayer.nativeElement.paused) {
      this.videoplayer.nativeElement.play();
      this.karaoke();
      this.pauseClass = "fa-pause-circle";
    } else {
      this.videoplayer.nativeElement.pause();
      clearInterval(this.interval);
      this.pauseClass = "fa-play-circle";
    }
  }

  karaoke() {
    this.interval = setInterval(() => {
      let changed = false;
    
      if (!this.currentTime || this.lyrics[0].time <= this.currentTime) {
        changed = true;
      }
    
      if (changed) {
        if (!this.currentTime) {
          this.line1 = " ";
          this.line2 = this.lyrics[0].lyrics;
        } else {
          this.line1 = this.lyrics[0].lyrics;
          this.line2 = (this.lyrics.length > 1) ? this.lyrics[1].lyrics : "";
          this.lyrics.shift();
        }
      }
    
      this.currentTime++;
      if (this.lyrics.length === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

}
