import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performances.service';

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.css'],
  providers: [PerformanceService]
})
export class PerformancesComponent implements OnInit {
  performances: Array<object>;

  constructor(private performanceService: PerformanceService) { }

  ngOnInit() {
    this.performanceService.getPerformances().subscribe(performances => this.performances = performances);
  }

}
