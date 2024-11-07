import { Weather } from "./types";

export async function fetchWeather(location: string = ""): Promise<Weather> {
  try {
    return fetch(`/api/weather/${location.trim().replace(/ /g, "+")}`).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch weather: ${res.status}`);
      }
      return res.json();
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("fetchWeather: an error occurred");
    }
  }
}
