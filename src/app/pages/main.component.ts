import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideBarComponent } from '../@Core/components/aside-bar/aside-bar.component';
import { NavbarComponent } from '../@Core/components/navbar/navbar.component';
import { GlobalLoaderComponent } from '../shared/components/global-loader/global-loader.component';

@Component({
  selector: 'dash-main',
  standalone: true,
  imports: [RouterOutlet, GlobalLoaderComponent, NgIf, AsideBarComponent, NavbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
