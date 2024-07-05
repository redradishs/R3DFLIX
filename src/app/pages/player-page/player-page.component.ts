import { AfterViewInit, Component, OnDestroy, OnInit, Sanitizer } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Genre {
  id: number;
  name: string;
}
@Component({
  selector: 'app-player-page',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor, CommonModule, RouterLink],
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.css'
})
export class PlayerPageComponent implements OnInit, OnDestroy, AfterViewInit {

  nowPlaying: any[] = [];

  streamingLink: SafeResourceUrl | undefined;

  movieId: any;
  movieDetails: any;
  private routeSub: Subscription | undefined;

  constructor(private route: ActivatedRoute, private api: ApiService, private sanitzer: DomSanitizer) { }

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

  ngAfterViewInit(): void {
    const iframe = document.getElementById('streamingIframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.onload = () => {
        const iframeWindow = iframe.contentWindow;
        if (iframeWindow) {
          iframeWindow.addEventListener('click', (event) => {
            event.stopPropagation();
          });
          iframeWindow.open = function() {
            return null;
          };
        }
      };
    }
  }
  
  setStreamingLink() {
    const url = `https://vidsrc.to/embed/movie/${this.movieId}`;
    this.streamingLink = this.sanitzer.bypassSecurityTrustResourceUrl(url); 
  }

  retrieveMovieDetails() {
    this.api.getMovieDetails(this.movieId).subscribe((data) => {
      this.movieDetails = data;
      console.log("r3design");
    });
  }

  retrieveNowPlaying() {
    this.api.getNowPlaying().subscribe((data) => {
      this.nowPlaying = data.slice(0,12);
      console.log("r3design");
    });
  }


  getPosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  getGenres(): string {
    return this.movieDetails?.genres.map((genre: Genre) => genre.name).join(', ') || '';
  }

  getRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  }

  navigatetoPlayer(){
    const url = `https://vidsrc.to/embed/movie/${this.movieDetails.id}`;
    window.open(url, 'blank');
  }

}
