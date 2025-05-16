import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() fontSize: string = '2em';
  @Input() readonly: boolean = false;

  @Output() ratingChange = new EventEmitter<number>();
  hoverValue: number | null = null;

  get starArray(): string[] {
    const stars: string[] = [];
    let ratingToUse = this.hoverValue !== null ? this.hoverValue : this.rating;
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

  setRating(value: number): void {
    console.log(`rating`, value);
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }

  hoverRating(value: number): void {
    this.hoverValue = value;
  }

  resetHover(): void {
    this.hoverValue = null;
  }
}

