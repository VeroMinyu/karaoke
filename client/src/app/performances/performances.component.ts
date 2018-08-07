import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performances.service';

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: [
    './performances.component.css',
    '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
  ]
})
export class PerformancesComponent implements OnInit {
  performances: Array<object>;
  search: string;

  constructor(private performanceService: PerformanceService) { }

  ngOnInit() {
    this.performanceService.getPerformances().subscribe(performances => this.performances = performances);
  }

}
