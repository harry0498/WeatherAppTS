export type Weather = {
  tempC: {
    cur: number;
    min: number;
    max: number;
  };
  tempF: {
    cur: number;
    min: number;
    max: number;
  };
  humidity: number;
  precipMM: number;
  description: string;
  areaName: string;
  lastUpdate: Date;
};
