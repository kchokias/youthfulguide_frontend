import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-confirmation-dialog',
  imports: [CommonModule, NgClass],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {
  @Input() description: string = '';
  @Input() type: 'info' | 'warning' | 'success' = 'info';

  private _resolve!: (value: boolean) => void;

  public open(description: string): Promise<boolean> {
    this.description = description;
    return new Promise<boolean>((resolve) => {
      this._resolve = resolve;
    });
  }

  confirm() {
    this._resolve(true);
    this.destroy();
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
