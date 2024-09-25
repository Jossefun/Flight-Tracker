
/*
Define a FlightResponse interface to match the OpenSky API response structure.
Use this interface in both the FlightService and the FlightListComponent
*/

export interface FlightResponse {
  time: number;
  states: FlightState[];
}

export interface FlightState {
  callsign: string;
  origin_country: string;
  latitude: number;
  longitude: number;
  altitude: number;
}