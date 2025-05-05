import { ApplicationRef,Injectable,Injector,createComponent } from '@angular/core';
import { SnackbarComponent } from './snackbar.component';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private appRef: ApplicationRef, private injector: Injector) {}

  open(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration = 10000
  ) {
    const componentRef = createComponent(SnackbarComponent, {
      environmentInjector: this.appRef.injector,
    });

    componentRef.instance.message = message;
    componentRef.instance.type = type;

    const removeSnackbar = () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    };

    componentRef.instance.close = removeSnackbar;

    this.appRef.attachView(componentRef.hostView);
    document.body.appendChild(componentRef.location.nativeElement);

    setTimeout(() => {
      removeSnackbar();
    }, duration);
  }
}
