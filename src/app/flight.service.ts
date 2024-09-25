import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightResponse, FlightState } from './flight-list/flight-response.model';

/*
FlightService: Responsible for making the API call using HttpClient.
Components (like FlightList Component): Call the FlightService to get the data and display it.
*/

@Injectable({
  providedIn: 'root' // This ensures the service is provided globally
})

export class FlightService {

  constructor(private http: HttpClient) { }

  getFlights(): Observable<any> {
     return this.http.get<any>('https://opensky-network.org/api/states/all');
  }
}
