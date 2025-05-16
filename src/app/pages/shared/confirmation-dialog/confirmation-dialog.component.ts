import { Component, Input } from '@angular/core';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {
  @Input() description: string = '';
  @Input() type: 'info' | 'warning' | 'success' = 'info';

  userRating = 0;
  review: string = '';

  public constructor(private snackbarService: SnackbarService) {}

  private _resolve!: (value: boolean | { confirmed: boolean, rating: number, review: string }) => void;

  public open(description: string): Promise<boolean | { confirmed: boolean, rating: number, review: string }> {
    this.description = description;
    return new Promise((resolve) => {
      this._resolve = resolve;
    });
  }

  confirm() {
    this._resolve(true);
    this.destroy();
  }

  confirmIF() {
    if(this.userRating === 0) {
      this.snackbarService.open('Please rate at least 1 star to confirm.', 'error');
      return;
    } else {
      this._resolve({ confirmed: true, rating: this.userRating, review: this.review });
      this.destroy();
    }
  }

  cancel() {
    this._resolve(false);
    this.destroy();
  }

  private destroy() {
    const hostElem = (this as any).__ngContext__[8];
    if (hostElem && hostElem.parentNode) {
      hostElem.parentNode.removeChild(hostElem);
    }
  }
}
