import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  constructor(private songsService: SongsService) { }

  ngOnInit() {
  }

}
