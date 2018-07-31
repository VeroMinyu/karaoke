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
  @ViewChild('videoPlayer') videoplayer: any;
  videoSource: string = "";
  pauseClass: string = "fa-pause-circle";
  startTime: number = 0;

  constructor(private songsService: SongsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.songsService.getSong(params.id).subscribe(song => {
        this.song = song;
        this.videoSource = `${environment.videoURL}${song.video_name}`;
      });
    });
  }

  toggle() {
    if (this.videoplayer.nativeElement.paused) {
      this.videoplayer.nativeElement.play();
      this.pauseClass = "fa-pause-circle";
    } else {
      this.videoplayer.nativeElement.pause();
      this.pauseClass = "fa-play-circle";
    }
  }

}
