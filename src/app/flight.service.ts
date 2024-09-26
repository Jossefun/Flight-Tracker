import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { FlightState } from './flight-list/flight-response.model';
/*
FlightService: Responsible for making the API call using HttpClient.
Components like FlightList Component: Call the FlightService to get the data and display it.
*/

@Injectable({
  providedIn: 'root' // This ensures the service is provided globally
})

export class FlightService {


  private flightsSubject = new BehaviorSubject<FlightState[]>([]);
  flights$ = this.flightsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getFlights(): Observable<any> {
     return this.http.get<any>('https://opensky-network.org/api/states/all');
  }

  updateFlights(flights: FlightState[]) {
    console.log('Updating flights:', flights);
    this.flightsSubject.next(flights); // next is pushing new value to flights
  }
}


/*
the $ sign in "flights$" is commonly used as a convention to denote that a variable is an Observable.
 This helps developers quickly identify which variables are streams of data that can emit multiple values over time,
 distinguishing them from regular variables.

 Observable:

An Observable is a part of the RxJS library (Reactive Extensions for JavaScript) 
that allows you to work with asynchronous data streams. 
Observables can emit values over time,
 which can be subscribed to by other parts of your application.
 */