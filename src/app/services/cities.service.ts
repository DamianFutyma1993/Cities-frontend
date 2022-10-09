import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../city';


@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCity(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiServerUrl}/city/all`);
  }

  public updateCity(city: City): Observable<City> {
    return this.http.put<City>(`${this.apiServerUrl}/city/update`, city);
  }
}
