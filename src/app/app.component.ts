import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CitiesService } from './services/cities.service';
import { City } from './city';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public cities: City[];
  public editCity : City;
  p:any;
  data:any=[];

  constructor(private cityService: CitiesService) {}

  ngOnInit(): void {
    this.getCity();
  }

  public getCity(): void {
    this.cityService.getCity().subscribe(
      (response: City[]) => {
        this.cities = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchCity(key: string): void {
    const results: City[] = [];
    for (const city of this.cities) {
      if (city.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(city);
      }
    }
    this.cities = results;
    if (results.length === 0 || !key) {
      this.getCity();
    } else {
      this.p = 1;
    }
  }

  public onOpenModal(city: City, mode: string) : void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'edit'){
      this.editCity = city;
      button.setAttribute('data-target','#updateCityModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onUpdateCity(city: City): void {
    this.cityService.updateCity(city).subscribe(
      (response : City) => {
        console.log(response);
        this.getCity();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}