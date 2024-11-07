import express from "express";
import { Weather } from "../types/weather";
const router = express.Router();
const API_URI = "https://wttr.in";

/**
 * Fetch the weather for a location
 *
 * @param {string} loc - The location to query.
 * @returns {Promise<Weather>} The JSON response
 */
async function fetch_weather(loc: string): Promise<Weather> {
  try {
    const params = new URLSearchParams({
      format: "j1",
    });

    const res = await fetch(`${API_URI}/${loc}?${params}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch weather: ${res.status}`);
    }

    const data = await res.json();

    const response: Weather = {
      tempC: {
        cur: data.current_condition[0].temp_C,
        min: data.weather[0].mintempC,
        max: data.weather[0].maxtempC,
      },
      tempF: {
        cur: data.current_condition[0].temp_F,
        min: data.weather[0].mintempF,
        max: data.weather[0].maxtempF,
      },
      humidity: data.current_condition[0].humidity,
      precpMM: data.weather[0].precipMM,
      description: data.current_condition[0].weatherDesc
        .map((desc: any) => desc.value)
        .join(", "),
      areaName: `${data.nearest_area[0].areaName[0].value}, ${data.nearest_area[0].region[0].value}`,
    };

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

router.get("/weather", async (_, res) => {
  try {
    const data = await fetch_weather("");

    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    res.status(500).json({ message: "Failed to fetch weather" });
  }
});

router.get("/weather/:location", async (req, res) => {
  try {
    const data = await fetch_weather(req.params.location.replace(" ", "+"));

    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    res.status(500).json({ message: "Failed to fetch weather" });
  }
});

export default router;
