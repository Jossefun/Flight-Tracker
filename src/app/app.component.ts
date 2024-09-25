import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  // No need to import RouterModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrected from styleUrl to styleUrls
})
export class AppComponent {
  logClick() {
    console.log('Link clicked');
  }
  title = 'Flight Tracker';
}