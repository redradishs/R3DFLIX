import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, NgFor, HttpClientModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  searchQuery: string = '';

  nowPlaying: any[] = [];
  popularMovies: any[] = [];
  topRated: any[] = [];
  tvShows: any[] = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveNowPlaying();
    this.retrievePopularMovies();
    this.retrieveTopRated();
    this.retrieveTVShows();
  }

  retrieveNowPlaying() {
    this.api.getNowPlaying().subscribe((data) => {
      this.nowPlaying = data.slice(0,6);
      console.log("r3design");
    });
  }

  retrievePopularMovies() {
    this.api.getPopularMovies().subscribe(
      (data) => {
        this.popularMovies = data.slice(0,6);
        console.log("r3design");
      }
    );
  }

  retrieveTVShows(){
    this.api.getTvShows().subscribe(
      (resp) => {
        this.tvShows = resp.slice(0,6);
      }
    )
  }

  retrieveTopRated() {
    this.api.getTopRated().subscribe(
      (resp) => {
        this.topRated = (resp).slice(0,6);
        console.log("r3design");
      }
    )
  }








  
  getPosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  searchMovies(): void {
    if (this.searchQuery.trim()) {
      this.api.searchStream(this.searchQuery).subscribe((results) => {
        console.log("r3design");
        this.router.navigate(['search', this.searchQuery]);
      });
    }
  }


}
