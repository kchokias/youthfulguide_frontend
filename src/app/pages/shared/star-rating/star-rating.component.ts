import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {

  @Input() rating: number = 0;
  @Input() fontSize: string = '2em';

  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }
}
