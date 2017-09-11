import { Component, Input, OnInit } from '@angular/core';

import { Car } from '../Car'


@Component({
  selector: 'cs-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  @Input() cars: Array<Car>;

  constructor() {
  }

  ngOnInit() {
  }

}
