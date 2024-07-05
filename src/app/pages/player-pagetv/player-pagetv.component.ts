import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';

export interface Genre {
  id: number;
  name: string;
}

@Component({
  selector: 'app-player-pagetv',
  standalone: true,
  imports: [NavbarComponent, CommonModule, NgFor, RouterLink],
  templateUrl: './player-pagetv.component.html',
  styleUrls: ['./player-pagetv.component.css']
})
export class PlayerPagetvComponent implements OnInit, OnDestroy {
  nowPlaying: any[] = [];
  streamingLink: SafeResourceUrl | undefined;
  movieId: any;
  movieDetails: any;
  private routeSub: Subscription | undefined;
  selectedSeason: any;
  selectedEpisode: any;

  constructor(private route: ActivatedRoute, private api: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      this.retrieveMovieDetails();
      this.retrieveNowPlaying();
      this.setStreamingLink();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }


  setStreamingLink(seasonNumber?: number, episodeNumber?: number) {
    let url;
    if (seasonNumber !== undefined && episodeNumber !== undefined) {
      url = `https://vidsrc.to/embed/tv/${this.movieId}/${seasonNumber}/${episodeNumber}`;
    } else {
      url = `https://vidsrc.to/embed/movie/${this.movieId}`;
    }
    this.streamingLink = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  selectSeason(season: any): void {
    this.selectedSeason = season;
    console.log(`Selected Season: ${season.season_number}`);
  }


  selectEpisode(seasonNumber: number, episodeNumber: number): void {
    this.setStreamingLink(seasonNumber, episodeNumber);
    console.log(`Selected Episode: ${episodeNumber}`);
  }


  retrieveMovieDetails() {
    this.api.getDetailsTV(this.movieId).subscribe((data) => {
      this.movieDetails = data;
      console.log("r3design");
    });
  }

  retrieveNowPlaying() {
    this.api.getNowPlaying().subscribe((data) => {
      this.nowPlaying = data.slice(0, 12);
      console.log("r3design");
    });
  }

  getPosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  getGenres(): string {
    return this.movieDetails?.Genres.map((genre: Genre) => genre.name).join(', ') || '';
  }

  getRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  }

  navigatetoPlayer() {
    const url = `https://vidsrc.to/embed/movie/${this.movieDetails.id}`;
    window.open(url, 'blank');
  }

  getEpisode(season: number, episode: number): void {
    this.api.getEpisode(this.movieId, season, episode).subscribe((data) => {
      console.log("r3design");
    });
  }

}
