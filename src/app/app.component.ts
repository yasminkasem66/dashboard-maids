import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
}
