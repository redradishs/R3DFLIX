import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { NgFor} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tvshow',
  standalone: true,
  imports: [NavbarComponent, NgFor, RouterLink, FormsModule],
  templateUrl: './tvshow.component.html',
  styleUrl: './tvshow.component.css'
})
export class TvshowComponent implements OnInit {

  searchQuery: string = '';

  tvShows: any[] = [];

  constructor(private api: ApiService, private router: Router) { 
  }

  ngOnInit(): void {
    this.retrieveTVShows();
  }

  retrieveTVShows(){
    this.api.getTvShows().subscribe(
      (resp) => {
        this.tvShows = resp;
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
