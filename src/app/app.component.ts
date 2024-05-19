import { Component, Injector, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { GlobalLoaderService } from './shared/ui-services/global-loader.service';
import { GlobalLoaderComponent } from './shared/components/global-loader/global-loader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GlobalLoaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loaderService = inject(GlobalLoaderService);
  injector = inject(Injector);
  router = inject(Router);

  isLoading: boolean = true;

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.showLoader();
      } else if (event instanceof NavigationEnd) {
        this.loaderService.hideLoader();
      }
    });
  }
}
