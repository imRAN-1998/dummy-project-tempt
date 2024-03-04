import { Routes } from '@angular/router';
import { AnimeCompComponent } from './anime-comp/anime-comp.component';
import { MatterCompComponent } from './matter-comp/matter-comp.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    { path : '', redirectTo : 'main', pathMatch : 'full'},
    { path : 'animejs', component : AnimeCompComponent},
    { path : 'matterjs', component : MatterCompComponent},
    { path : 'main', component : MainPageComponent},
    { path : '**', redirectTo : 'matterjs'},
];
