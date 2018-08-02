import { Component, OnInit, ViewChild } from "@angular/core";
import * as RecordRTC from "recordrtc";

@Component({
  selector: "app-test-video",
  templateUrl: "./test-video.component.html",
  styleUrls: ["./test-video.component.css"]
})
export class TestVideoComponent implements OnInit {
  @ViewChild("video") video: any;
  stream: any;
  recordRTC: any;

  constructor() {}

  ngOnInit() { }

  ngAfterViewInit() {
    // set the initial state of the video
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  startRecording() {
    let mediaConstraints = {
      audio: true,
      video: { width: 1280, height: 720, minAspectRatio: 1.77 }
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  errorCallback() {}

  successCallback(stream: MediaStream) {
    var options = {
      mimeType: 'video/webm\;codecs=vp9'
  };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
    this.toggleControls();
  }

  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    var file = recordRTC.getBlob();
    recordRTC.getDataURL(function(dataURL) { });
  }

  download() {
    this.recordRTC.save("karaoke.webm");
  }
}
