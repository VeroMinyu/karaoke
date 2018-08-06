import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { PerformanceService } from '../../services/performances.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.css',
    '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
  ],
  providers: [PerformanceService]

})
export class ProfileComponent implements OnInit {
  performances: Array<object>;
  search: string;

  constructor(public sessionService: SessionService, private performanceService: PerformanceService) { }

  ngOnInit() {
    this.loadPerformances();
  }

  removePerformance(e, id) {
    e.stopPropagation();
    
    this.performanceService.removePerformance(id).subscribe(() => {
      this.loadPerformances();
    });
  }

  loadPerformances() {
    this.sessionService.isLogged().subscribe(user => {
      this.performanceService.getUserPerformances(user._id).subscribe(performances => this.performances = performances);
    });
  }

}
