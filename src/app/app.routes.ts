import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlayerPageComponent } from './pages/player-page/player-page.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { TvshowComponent } from './pages/tvshow/tvshow.component';
import { PlayerPagetvComponent } from './pages/player-pagetv/player-pagetv.component';
import { SearchmovieComponent } from './pages/searchmovie/searchmovie.component';
import { RestrictedComponent } from './pages/restricted/restricted.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', 
        component: HomeComponent },
    { path: 'movie/:id', 
        component: PlayerPageComponent },
    { path: 'tvshow/:id', 
            component: PlayerPagetvComponent },
    { path: 'movie', 
        component: MoviesComponent},
    { path: 'tvshows', 
        component: TvshowComponent },
    { path: 'search/:query',   
        component: SearchmovieComponent },
    { path: 'restricted',      
        component: RestrictedComponent },

];
