import { Component, Input, OnInit } from '@angular/core';

import { Review } from '../Review';

@Component({
  selector: 'cs-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() reviews: Review;

  constructor() {
  }

  ngOnInit() {
  }

}
