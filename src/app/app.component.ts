import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrected from styleUrl to styleUrls
})
export class AppComponent {
  logClick() {
    console.log('Link clicked');
  }
  title = 'Flight Tracker';
}