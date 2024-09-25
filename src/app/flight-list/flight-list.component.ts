import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FlightResponse, FlightState } from './flight-response.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})

export class FlightListComponent implements OnInit {

  //This will hold the flights data , FlightState array struct from "flight-response.model" file
  flights: FlightState[] = [];
  loading = true;
  
  //The constructor is a special method that gets called when the component is created.
  //It is used for initializing component-level variables and injecting dependencies.
  constructor(private flightService: FlightService){}

  ngOnInit(): void {
  /* subscribe(): Observables in Angular need to be "subscribed" to in order to receive data from them. 
    The subscribe() method takes two callbacks:
    1.The first callback is triggered when data is successfully received.
    2.The second callback handles errors.  */
 
    this.flightService.getFlights().subscribe({
      next: (data: any) => {
        // Check if the response has 'states' and it's an array
        if (data.states && Array.isArray(data.states)) {
          // Map the API data to FlightState array
          this.flights = data.states.map((state: any[]) => ({
            callsign: state[1]?.trim() || 'N/A',  // Mapping index 1 to 'callsign'
            origin_country: state[2] || 'N/A',    // Mapping index 2 to 'origin_country'
            latitude: state[6] || 0,              // Mapping index 6 to 'latitude'
            longitude: state[5] || 0,             // Mapping index 5 to 'longitude'
            altitude: state[7] || 0               // Mapping index 7 to 'altitude'
          }));
          this.loading = false;  // Stop loading spinner after fetching data
        }
      },
      error: (error) => {
        console.error('Error fetching flights: ', error);
        this.loading = false;     
      }
    });
  } 

}
