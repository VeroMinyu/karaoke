import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: any;

  randomSong: number = Math.floor(Math.random() * 8);

  videoSource: string = "";



  constructor() { }

  ngOnInit() {
    switch (this.randomSong) {
      case 0: {
        this.videoSource = "../../assets/videos/Ed Sheeran - Shape of You [Official Video]-JGwWNGJdvx8.mp4#t=35"
        break;
      }
      case 1: {
        this.videoSource = "../../assets/videos/Imagine Dragons - Believer-7wtfhZwyrcc.mp4"
        break;
      }
      case 2: {
        this.videoSource = "../../assets/videos/Nicky Jam x J. Balvin - X (EQUIS) _ Video Oficial _ Prod. Afro Bros & Jeon-_I_D_8Z4sJE.mp4#t=21"
        break;
      }
      case 3: {
        this.videoSource = "../../assets/videos/Sebastián Yatra - No Hay Nadie Más-sD9_l3oDOag.mp4#t=73"
        break;
      }
      case 4: {
        this.videoSource = "../../assets/videos/Maroon 5 - What Lovers Do ft. SZA-5Wiio4KoGe8.mp4#t=8"
        break;
      }
      case 5: {
        this.videoSource = "../../assets/videos/Cali Y El Dandee - Por Fin Te Encontré ft. Juan Magan, Sebastian Yatra-_kxz7WX4mLU.mp4#t=56";
        break;
      }
      case 6:{
        this.videoSource="../../assets/videos/Taylor Swift - We Are Never Ever Getting Back Together-WA4iX5D9Z64.mp4#t=44";
        break;
      }
      case 7:{
        this.videoSource="../../assets/videos/Luis Fonsi - Despacito ft. Daddy Yankee-kJQP7kiw5Fk.mp4#t=80";
        break;
      }
    }
  }

  toggle() {
    this.videoplayer.nativeElement.paused ? this.videoplayer.nativeElement.play() : this.videoplayer.nativeElement.pause();
  }

  toggleSound() {
    this.videoplayer.nativeElement.muted = !this.videoplayer.nativeElement.muted;
  }
}
