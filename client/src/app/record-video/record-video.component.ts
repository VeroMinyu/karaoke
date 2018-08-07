import { Component, OnInit, ViewChild, Output, EventEmitter, Input, SimpleChange } from "@angular/core";
import * as RecordRTC from "recordrtc";
import { SessionService } from "../../services/session.service";
import { PerformanceService } from "../../services/performances.service";
import { Router } from "../../../node_modules/@angular/router";

@Component({
  selector: "app-record-video",
  templateUrl: "./record-video.component.html",
  styleUrls: ["./record-video.component.css"]
})
export class RecordVideoComponent implements OnInit {
  @ViewChild("video") video: any;
  @ViewChild("canvas") canvas: any;
  stream: any;
  recordRTC: any;
  file: any;
  loading: boolean = false;
  screenShot: any;

  recording: boolean = false;
  finishRecording: boolean = false;

  @Input() songId: string;
  @Input() reset: boolean;
  @Output() onStartRecording = new EventEmitter<void>();
  @Output() onStopRecording = new EventEmitter<void>();

  constructor(private sessionService: SessionService, private performanceService: PerformanceService, private router: Router) { }

  ngOnInit() { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];

      if (propName == "reset" && !changedProp.isFirstChange() && changedProp.currentValue) {
        this.recording = false;
        this.finishRecording = false;
        this.video.nativeElement.src = null;
      }
    }
  }

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
      video: { width: 640 }
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));

    setTimeout(function () { this.capture() }.bind(this), 2000)
  }

  errorCallback() { }

  successCallback(stream: MediaStream) {
    this.onStartRecording.emit();
    this.recording = true;

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
    this.onStopRecording.emit();

    this.recording = false;
    this.finishRecording = true;

    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  processVideo(audioVideoWebMURL) {
    this.video.nativeElement.src = audioVideoWebMURL;
    this.toggleControls();
    this.file = this.recordRTC.getBlob();
  }

  download() {
    this.recordRTC.save("karaoke.webm");
  }

  upload() {
    this.loading = true;
    this.performanceService
      .addPerformance(this.sessionService.user._id, this.songId, this.file, this.screenShot)
      .subscribe(response => {
        this.loading = false;
        this.router.navigate(['/performances']);
      });
  }

  capture() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 277.59, 208.19);
    this.screenShot=this.canvas.nativeElement.toDataURL("image/jpeg")
  }
}
