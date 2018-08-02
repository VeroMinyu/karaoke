import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';

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
  recommendations: any;

  @ViewChild('videoPlayer') videoplayer: any;
  videoSource: string = "";
  height: number = 0;
  pauseClass: string = "fa-play-circle";

  interval: any;
  currentTime: number;
  line1: string;
  line2: string;
  lyrics: Array<any>;

  constructor(private songsService: SongsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.songsService.getSong(params.id).subscribe(song => {
        this.reset();
  
        this.song = song;
        this.videoSource = `${environment.videoURL}${song.video_name}`;
        if (this.videoplayer) {
          this.videoplayer.nativeElement.src = this.videoSource;
        }
        this.lyrics = this.song.lyrics;
        this.songsService.getRecommendations(this.song.artist).subscribe(list => {
          for (var i = 0; i < list.length; i++) {
            if (this.song.video_id == list[i].video_id) {
              list.splice(i, 1)
            }
          }
          this.recommendations = list;
        })
      });
    });
  }

  ngAfterViewChecked() {
    if (this.videoplayer) {
      setTimeout(() => {
        this.height = this.videoplayer.nativeElement.clientHeight;
      });
    }
  }

  reset() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.pauseClass = "fa-play-circle";
    this.currentTime = 0;
    this.line1 = "";
    this.line2 = "";
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
