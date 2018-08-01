import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css'],
  providers: [SongsService]
})
export class SongsListComponent implements OnInit {
  songs: Array<object>;

  constructor(private songsService: SongsService) { }

  ngOnInit() {
    this.songsService.getSongs().subscribe(songs => {
      this.songs = songs;
    });
  }

  updateList() {
    this.songsService.getSongs().subscribe(songs => {
      this.songs = songs;
    });
  }

}
