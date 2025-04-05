import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() fontSize: string = '2em';

  get starArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  getStarType(star: number): string {
    if (this.rating >= star) {
      return 'full';
    } else if (this.rating > star - 1) {
      return 'half';
    } else {
      return 'empty';
    }
  }
}
