import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './custom-gallery.component.html',
  styleUrls: ['./custom-gallery.component.css']
})

export class CustomGalleryComponent {
  @Input() photos: string[] = [];
  @Input() totalPhotos: number = 0;

  get firstPhoto(): string | null {
    return this.photos.length > 0 ? this.photos[0] : null;
  }

  get mediumPhotos(): string[] {
    return this.photos.length > 2 ? this.photos.slice(1, 3) : [];
  }

  get smallPhotos(): string[] {
    if (this.photos.length <= 3) return [];
    return this.photos.slice(3, 7);
  }

  get remainingCount(): number {
    return Math.max(0, this.totalPhotos - 7);
  }
}
