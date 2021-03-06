import { Component, OnInit, ViewChild } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: [
    './song.component.css',
    '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
  ],
  providers: [SongsService]
})
export class SongComponent implements OnInit {
  song: any;
  recommendations: any;
  colorChange: any;
  changeTextColor: any;
  showMenu: any;
  showDisco = {'display': 'none'}
  showSpeaker = {'display': 'none'}
  showTA = {'display': 'none'}
  showWings = {'display': 'none'}
  showAtom = {'display': 'none'}
  activeSkin: any;
  isChecked;
  
  @ViewChild('videoPlayer') videoplayer: any;
  videoSource: string = "";
  height: number = 0;
  pauseText: string = "Sing";
  pauseClass: string = "fa-play-circle";
  liveClass: string = "fa-microphone";

  interval: any;
  currentTime: number;
  line1: string;
  line2: string;
  lyrics: Array<any>;

  live: boolean = false;
  resetLive: boolean = false;
  finishLive: boolean = false;
  showLiveBtn: boolean = true;
  showSingBtn: boolean = true;

  constructor(private songsService: SongsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.songsService.getSong(params.id).subscribe(song => {
        this.song = song;
        this.videoSource = `${environment.videoURL}${song.video_name}`;
        if (this.videoplayer) {
          this.videoplayer.nativeElement.src = this.videoSource;
        }

        this.reset(false);
        this.songsService.getRecommendations(this.song.artist).subscribe(list => {
          for (var i = 0; i < list.length; i++) {
            if (this.song.video_id == list[i].video_id) {
              list.splice(i, 1);
            }
          }
          this.recommendations = list;
        })
      });
    });
  }

  ngAfterViewChecked() {
    if (this.videoplayer) {
      this.videoplayer.nativeElement.onended = () => {
        if (this.live) {
          this.finishLive = true;
        }
        this.reset();
      };
      setTimeout(() => {
        this.height = this.videoplayer.nativeElement.clientHeight + 45;
      });
    }
  }

  reset(resetIcons = true) {
    if (this.videoplayer) {
      this.videoplayer.nativeElement.currentTime = 0;
      this.videoplayer.nativeElement.pause();
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (resetIcons) {
      this.pauseText = "Sing";
      this.pauseClass = "fa-undo";
      this.liveClass = "fa-undo";
    }

    this.lyrics = this.song.lyrics.slice(0);
    this.currentTime = 0;
    this.line1 = "";
    this.line2 = "";
    this.showLiveBtn = true;
    this.showSingBtn = true;
    this.resetLive = false;
  }

  toggle() {
    this.live = false;
    if (this.videoplayer.nativeElement.paused) {
      this.videoplayer.nativeElement.play();
      this.karaoke();
      this.pauseText = "Pause";
      this.pauseClass = "fa-pause-circle";
      this.showMenu={'display': 'none'}
      this.colorChange = 'black';
      this.changeTextColor = 'whiteText';
      this.changeSkin2();
    } else {
      this.videoplayer.nativeElement.pause();
      clearInterval(this.interval);
      this.pauseText = "Sing";
      this.pauseClass = "fa-play-circle";
      this.showMenu={'display': 'block'}
      this.colorChange = 'white';
      this.changeTextColor = 'blackText';
      this.changeSkin3();
    }
  }

  changeSkin2(){
    switch (this.activeSkin) {
      case 'disco': this.showDisco={'display': 'inline-block'}; break;
      case 'speaker': this.showSpeaker={'display': 'inline-block'}; break;
      case 'ironhack': this.showTA={'display': 'inline-block'}; break;
      case 'wings': this.showWings={'display': 'inline-block'}; break;
      case 'atom': this.showAtom={'display': 'inline-block'}; break;
      default: this.showDisco={'display': 'inline-block'}; break;
    }
  }

  changeSkin3(){
    switch (this.activeSkin) {
      case 'disco': this.showDisco={'display': 'none'}; break;
      case 'speaker': this.showSpeaker={'display': 'none'}; break;
      case 'ironhack': this.showTA={'display': 'none'}; break;
      case 'wings': this.showWings={'display': 'none'}; break;
      case 'atom': this.showAtom={'display': 'none'}; break;
      default: this.showDisco={'display': 'none'}; break;
    }
  }

  karaoke() {
    this.showLiveBtn = false;

    this.interval = setInterval(() => {
      let changed = false;

      if (!this.currentTime || (this.lyrics[0].time + this.song.offset) <= this.currentTime) {
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

  startLive() {
    this.live = true;
    this.finishLive = false;
    this.resetLive = true;
    this.showLiveBtn = false;
    this.showSingBtn = false;
  }

  startRecording() {
    this.videoplayer.nativeElement.play();
    this.karaoke();
  }

  stopRecording() {
    this.reset();
  }

  changeSkin(skin){
    this.activeSkin = skin;
    this.isChecked = false;
  }
  
}
