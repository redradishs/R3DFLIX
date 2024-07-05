import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NavbarComponent, CommonModule, NgFor, RouterLink, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  searchQuery: string = '';


  nowPlaying: any[] = [];
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.retrieveNowPlaying();
  }

  retrieveNowPlaying() {
    this.api.getNowPlaying().subscribe((data) => {
      this.nowPlaying = data;
      console.log("r3design");
    });
  }

  getPosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  searchMovies(): void {
    if (this.searchQuery.trim()) {
      this.api.searchStream(this.searchQuery).subscribe((results) => {
        console.log("r3design");
        this.route.navigate(['search', this.searchQuery]);
      });
    }
  }

  
}
