import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Car } from '../Car'

@Component({
  selector: 'cs-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {
  @Input() car: Car;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }


  viewCarDetails(carId): void {
    this.router.navigate(['/cars/details', carId]);
  }

}
