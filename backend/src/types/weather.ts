interface WeatherTemperature {
  cur: number;
  min: number;
  max: number;
}

export interface Weather {
  tempC: WeatherTemperature;
  tempF: WeatherTemperature;
  humidity: number;
  precpMM: number;
  description: string;
  areaName: string;
}
