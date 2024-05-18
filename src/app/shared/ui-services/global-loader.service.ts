import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoaderService {
  loaderSignal: WritableSignal<boolean> = signal(true);

  showLoader(): void {
    this.loaderSignal.set(true);
  }

  hideLoader(): void {
    this.loaderSignal.set(false);
  }
}
