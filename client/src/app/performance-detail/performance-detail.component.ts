import { Component, OnInit, ViewChild } from '@angular/core';
import { PerformanceService } from '../../services/performances.service';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session.service';


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
  comment: string;
  allComments= [];

  @ViewChild('videoPlayer') videoplayer: any;
  videoSource: string = "";
  pauseText: string = "Play";
  pauseClass: string = "fa-play-circle";

  constructor(private performanceService: PerformanceService, private route: ActivatedRoute, public sessionService: SessionService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.performanceService.getPerformance(params.id).subscribe(performance => {
        this.myPerformance = performance;
        this.videoSource = performance.video_url;
        this.allComments = performance.comments;
        this.sortByDate(this.allComments);
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

  post(){
    this.performanceService.addComment(this.comment,this.myPerformance._id,this.sessionService.user._id)
    .subscribe(newPerformance => {
      this.comment="";
      this.allComments = newPerformance['comments']
      this.sortByDate(this.allComments);
    })
  }

  sortByDate(myArray): void {
    myArray.sort((a , b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  toggleSubscribe(userId) {
    this.sessionService.toggleSubscribe(userId).subscribe();
  }

}
