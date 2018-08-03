import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import * as RecordRTC from "recordrtc";
import { SessionService } from "../../services/session.service";
import { PerformanceService } from "../../services/performances.service";

@Component({
  selector: "app-record-video",
  templateUrl: "./record-video.component.html",
  styleUrls: ["./record-video.component.css"],
  providers: [PerformanceService]
})
export class RecordVideoComponent implements OnInit {
  @ViewChild("video") video: any;
  stream: any;
  recordRTC: any;
  file: any;

  recording: boolean = false;
  finishRecording: boolean = false;

  @Input() songId: string;
  @Output() onStartRecording = new EventEmitter<void>();

  constructor(private sessionService: SessionService, private performanceService: PerformanceService) {}

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
      video: { width: 320, minAspectRatio: 1.77 }
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  errorCallback() {}

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

    this.recordRTC.getDataURL(function(dataURL) { }.bind(this));
  }

  download() {
    this.recordRTC.save("karaoke.webm");
  }

  upload() {
    this.performanceService
      .addPerformance(this.sessionService.user._id, this.songId, this.file)
      .subscribe(response => {
        console.log(response);
      });
  }
}
