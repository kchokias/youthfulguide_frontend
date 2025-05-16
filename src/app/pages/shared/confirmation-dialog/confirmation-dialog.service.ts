import {
  ApplicationRef,
  Injectable,
  Injector,
  createComponent,
} from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmationDialogService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(
    description: string,
    type: 'info' | 'warning' | 'success' = 'info'
  ): Promise<boolean | { confirmed: boolean; rating: number; review: string }> {
    const componentRef = createComponent(ConfirmationDialogComponent, {
      environmentInjector: this.appRef.injector,
    });

    const instance = componentRef.instance;
    instance.description = description;
    instance.type = type;

    this.appRef.attachView(componentRef.hostView);

    const domElem = componentRef.location.nativeElement;
    document.body.appendChild(domElem);

    return instance.open(description).finally(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    });
  }
}
