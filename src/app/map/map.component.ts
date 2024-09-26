import { Component, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlightService } from '../flight.service';
import { FlightState } from '../flight-list/flight-response.model';
import { icon, marker } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {

  private leaflet: any;
  private map: any;
  private markers: any[] = [];

  /*This constructor is using Angular's dependency injection to get access to PLATFORM_ID,
    which tells you whether the code is running in the browser or on the server
    @Inject(PLATFORM_ID): This decorator is used to inject the PLATFORM_ID token, 
    which provides information about whether the app is running on a server or browser platform
    platformId: Object: holds the information about the platform type (browser, server, etc.). */
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private flightService: FlightService

  ) {}

  ngOnInit(): void {

    // Check the platformId if running in a browser (Leaflet only works in a browser environment)
    if (isPlatformBrowser(this.platformId)) {
      
      //Dynamically import Leaflet only in the browser environment
      //Leaflet is a JavaScript library used for interactive maps.
      import('leaflet').then(L => { 
        this.leaflet = L;
        this.initializeMap(); // Initialize the map after loading Leaflet
        this.subscribeToFlightUpdates();
      });
    }
  }

  initializeMap(): void {
    this.map = this.leaflet.map('map').setView([31.0461,  34.8516], 6);

    this.leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // const icon = L.icon({
    //   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', // Icon URL
    //   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png' // Shadow URL
    // });

    // Make sure the map invalidates its size after it's rendered
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0); 
  }

  //Subscribes to the flights$ observable from the FlightService. 
  //Whenever new flight data is emitted, this function is triggered.
  subscribeToFlightUpdates(): void {
    this.flightService.flights$.subscribe((flights: FlightState[]) => { 
      console.log('Received flights in Map Component:', flights)
      this.updateMapMarkers(flights); 
      
    });
  }

  //Loops through existing markers and removes them from the map to prepare for new data.
  updateMapMarkers(flights: FlightState[]): void {
    if (!this.map) {
      console.error('Map is not initialized');
      return;
    }
    // Log the number of flights received
    console.log(`Number of flights to update markers: ${flights.length}`);

    if (this.markers) {
       this.markers.forEach((marker: any) => this.map.removeLayer(marker));
       this.markers = []; // Clear the array
    }
   
  //Iterates over each flight in the incoming data to create markers.
    flights.forEach(flight => {  
      const marker = this.leaflet.marker([flight.latitude, flight.longitude]) 
        .addTo(this.map) 
        .bindPopup(`<b>${flight.callsign}</b><br>Altitude: ${flight.altitude}`); //Binds a popup to the marker that displays the flight’s callsign and altitude when clicked.
      this.markers.push(marker); //Adds the new marker to the markers array for future reference.
    });
  }
}


/*
Summary:

Data Flow: 
The FlightService fetches flight data and shares it through an observable. 
The FlightListComponent fetches this data and updates the FlightService, 
while the MapComponent subscribes to this data and updates the map markers in real time.
Dynamic Map Updates: 
The map is updated whenever new flight data is received, 
ensuring that the displayed information is current.
Memory Management: 
Previous markers are cleared before new ones are added, 
preventing clutter on the map. */