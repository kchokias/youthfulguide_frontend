import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() fontSize: string = '2em';

  get starArray(): string[] {
    const stars: string[] = [];
    let remaining = this.rating;

    for (let i = 0; i < 5; i++) {
      if (remaining >= 1) {
        stars.push('full');
      } else if (remaining >= 0.5) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
      remaining -= 1;
    }

    return stars;
  }
}
