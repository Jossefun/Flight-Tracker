import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { MapComponent } from './map/map.component';


export const routes: Routes = [

    {path: 'dashboard', component: DashboardComponent},
    {path: 'flight-list', component: FlightListComponent},
    {path: 'map', component: MapComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'} 

];
