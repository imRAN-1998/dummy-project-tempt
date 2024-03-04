import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimeCompComponent } from './anime-comp/anime-comp.component';
import { MatterCompComponent } from './matter-comp/matter-comp.component';
import { MainPageComponent } from './main-page/main-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AnimeCompComponent,MatterCompComponent, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dummy-ang-project';
}
