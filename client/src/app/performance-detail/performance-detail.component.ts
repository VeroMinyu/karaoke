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

  user: any;
  url: any;

  myPerformance: any;
  checkboxFlag: any;
  comment: string = "";
  allComments = [];

  today1 = new Date();
  today = this.today1.getTime();
  month = this.today1.getMonth() + 1;
  last = this.today - (6 * 24 * 60 * 60 * 1000);
  allViewsTime = [];
  filteredViews = [];
  showDay = [];
  minus: number;
  howManyShow = [];
  chartData = [
    { data: [], label: 'Views of this Week' },
  ];

  @ViewChild('videoPlayer') videoplayer: any;
  height: number = 0;
  videoSource: string = "";
  pauseText: string = "Play";
  pauseClass: string = "fa-play-circle";

  constructor(private performanceService: PerformanceService, private route: ActivatedRoute, public sessionService: SessionService) { }

  ngOnInit() {
    this.url = window.location.href;
    this.route.params.subscribe(params => {
      this.performanceService.getPerformance(params.id).subscribe(performance => {
        //chartData
        this.allViewsTime = (performance.views.map(x => x.createdAt)).map(y => new Date(y)).map(z => z.getTime())
        this.filteredViews = this.allViewsTime.filter(x => x > this.last);
        this.showDay = this.filteredViews.map(x => new Date(x).getDate());
        this.howManyShow = this.countViews(this.showDay)
        this.minus = this.howManyShow[0].length
        this.chartData[0].data = this.createZero(7 - this.minus).concat(this.howManyShow[1])

        //performanceData
        this.myPerformance = performance;
        this.videoSource = performance.video_url;
        this.allComments = performance.comments;
        this.sortByDate(this.allComments);
        if (this.videoplayer) {
          this.videoplayer.nativeElement.src = this.videoSource;
        }
      })
    })
    this.user = this.sessionService.user;
  }

  ngAfterViewChecked() {
    if (this.videoplayer) {
      this.videoplayer.nativeElement.onended = () => {
        this.reset();
      };
    }
    if (this.videoplayer) {
      setTimeout(() => {
        this.height = this.videoplayer.nativeElement.clientHeight;
      });
    }
  }

  reset() {
    if (this.videoplayer) {
      this.videoplayer.nativeElement.currentTime = 0;
      this.videoplayer.nativeElement.pause();
    }
    this.pauseClass = "fa-undo";
    this.pauseText = "replay";
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

  changeLikes() {
    if (this.checkboxFlag) {
      this.myPerformance.likes.push(this.myPerformance.user._id)
    } else {
      this.myPerformance.likes.splice(this.myPerformance.likes.indexOf(this.myPerformance.user._id), 1)
    }
    this.performanceService.changeLikes(this.myPerformance._id, this.sessionService.user._id, this.checkboxFlag).subscribe()
  }

  post() {
    this.performanceService.addComment(this.comment, this.myPerformance._id, this.sessionService.user._id)
      .subscribe(newPerformance => {
        this.comment = "";
        this.allComments = newPerformance['comments']
        this.sortByDate(this.allComments);
      })
  }

  sortByDate(myArray): void {
    myArray.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  toggleSubscribe(userId) {
    this.sessionService.toggleSubscribe(userId).subscribe();
  }

  countViews(arr) {
    var a = [], b = [], prev;
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = arr[i];
    }

    return [a, b];
  }

  getDates(startDate, endDate) {
    var dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate).getDate().toString() + '/' + (new Date(currentDate).getMonth() + 1).toString());
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

  createZero(num) {
    var result = []

    for (var i = 0; i < num; i++) {
      result.push(0)
    }
    return result;
  }

  chartOptions = {
    responsive: true
  };

  chartLabels = this.getDates(this.last, this.today);


}
