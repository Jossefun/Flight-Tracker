import { Component, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {

  private leaflet: any;

  //This constructor is using Angular's dependency injection to get access to PLATFORM_ID,
     //which tells you whether the code is running in the browser or on the server
  //@Inject(PLATFORM_ID): This decorator is used to inject the PLATFORM_ID token, 
     //which provides information about whether the app is running on a server or browser platform
  //platformId: Object: holds the information about the platform type (browser, server, etc.).
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Check the platformId if running in a browser (Leaflet only works in a browser environment)
    if (isPlatformBrowser(this.platformId)) {
      
      //Dynamically import Leaflet only in the browser environment
      //Leaflet is a JavaScript library used for interactive maps.

      import('leaflet').then(L => { 
        this.leaflet = L;
        this.initializeMap(); // Initialize the map after loading Leaflet
      });
    }
  }

  initializeMap(): void {
    const map = this.leaflet.map('map').setView([31.0461,  34.8516], 6);

    this.leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Make sure the map invalidates its size after it's rendered
  setTimeout(() => {
    map.invalidateSize();
  }, 0); 
  }
}
