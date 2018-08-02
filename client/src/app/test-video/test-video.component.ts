import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test-video',
  templateUrl: './test-video.component.html',
  styleUrls: ['./test-video.component.css']
})
export class TestVideoComponent implements OnInit {
  
  @ViewChild('videoElement') videoElement: any;  
  video: any;

  constructor() { }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
  }

  getCam() {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      this.video.src = window.URL.createObjectURL(stream);

      this.video.play();
    });
  }
}
