import { Component, OnInit, ViewChild } from '@angular/core';
import { PerformanceService } from '../../services/performances.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-performance-detail',
  templateUrl: './performance-detail.component.html',
  styleUrls: [
    './performance-detail.component.css',
    '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
  ]
})

export class PerformanceDetailComponent implements OnInit {

  myPerformance: any;
  checkboxFlag: any;

  @ViewChild('videoPlayer') videoplayer: any;
  videoSource: string = "";
  pauseText: string = "Play";
  pauseClass: string = "fa-play-circle";

  constructor(private performanceService: PerformanceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.performanceService.getPerformance(params.id).subscribe(performance => {
        console.log(performance)
        this.myPerformance = performance;
        this.videoSource = performance.video_url;
        if (this.videoplayer) {
          this.videoplayer.nativeElement.src = this.videoSource;
        }
      })
    })
  }

  toggle() {
    if (this.videoplayer.nativeElement.paused) {
      this.videoplayer.nativeElement.play();
      this.pauseText = "Pause";
      this.pauseClass = "fa-pause-circle";
    } else {
      this.videoplayer.nativeElement.pause();
      this.pauseText = "Sing";
      this.pauseClass = "fa-play-circle";
    }
  }

  changeLikes(){
    if (this.checkboxFlag){
      this.myPerformance.likes.push(this.myPerformance.user._id)
    } else {
      this.myPerformance.likes.splice(this.myPerformance.likes.indexOf(this.myPerformance.user._id),1)
    }
  }

}
