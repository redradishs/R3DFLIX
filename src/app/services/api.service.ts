import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private baseUrl: string = 'https://movieapp-zyqr.onrender.com/api/v1';
  private tvBaseUrl: string = 'https://movieapp-zyqr.onrender.com/api/v2';
  private episodeUrl: string = 'https://vidsrc.to/embed/tv/';


  constructor(private http: HttpClient) { }


  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/popular`);
  }

  getNowPlaying(): Observable<any> {
    return this.http.get(`${this.baseUrl}/nowplayingmovies`);
}

getMovieDetails(movieId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/details/${movieId}`);
}   

getPopular(): Observable<any> {
  return this.http.get(`${this.baseUrl}/popular`);
}   

getTopRated(): Observable<any> {
  return this.http.get(`${this.baseUrl}/toprated_movies`);
}

getTvShows(): Observable<any> {
  return this.http.get(`${this.tvBaseUrl}/tvshows`);
}

getDetailsTV(movieId: number): Observable<any> {
  return this.http.get(`${this.tvBaseUrl}/tvshows_overview/${movieId}`);
}

getEpisode(movieId: number, season: number, episode: number): Observable<any> {
  return this.http.get(`${this.episodeUrl}${movieId}/${season}/${episode}`);
}

searchStream(query: string): Observable<any> {
  return this.http.get(`${this.tvBaseUrl}/all_series/${query}`);
}

}
