import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { query } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchmovie',
  standalone: true,
  imports: [NavbarComponent, NgFor, RouterLink, NgIf, FormsModule],
  templateUrl: './searchmovie.component.html',
  styleUrl: './searchmovie.component.css'
})
export class SearchmovieComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = []; 

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.searchQuery = params.get('query') || '';
      this.searchMovies();
    });
  }

  searchMovies(): void {
    if (this.searchQuery.trim()) {
      this.api.searchStream(this.searchQuery).subscribe((results) => {
        this.searchResults = results; 
        console.log("r3design");
      });
    }
  }

  getPosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }


  
}