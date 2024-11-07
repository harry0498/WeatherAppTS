import React, { useContext, useState } from "react";
import { Weather } from "@/lib/types";
import { fetchWeather } from "@/lib/api";
import { useMutation, useQuery } from "react-query";
import useLocalStorage from "@/lib/useLocalStorage";

type WeatherContextProps = {
  children: React.ReactNode;
};

type WeatherContext = {
  weather: Weather[];
  findWeather: (location: string) => void;
  deleteWeather: (areaName: string) => void;
};

const WeatherContext = React.createContext<WeatherContext | null>(null);

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}

export default function WeatherProvider({ children }: WeatherContextProps) {
  const weatherMutation = useMutation({
    mutationFn: fetchWeather,
    onSuccess: (data) => addWeather(data),
  });
  const { setItem, getItem } = useLocalStorage("weather");
  const storedData: Weather[] = getItem() ?? [];
  const {
    isError,
    error,
    data: localWeather,
  } = useQuery({
    queryKey: ["weather"],
    queryFn: () => fetchWeather(),
    enabled: storedData.length === 0,
  });

  if (isError) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("WeatherProvider: an error occurred with useQuery");
    }
  }

  const [weather, setWeather] = useState<Weather[]>(() => {
    if (localWeather) {
      localWeather.lastUpdate = new Date();
      setItem([localWeather]);
      return [localWeather];
    }
    return storedData;
  });

  function addWeather(data: Weather): void {
    // Check if the city is not already in the weather data
    if (weather.some((item: Weather) => item.areaName === data.areaName)) {
      return;
    }

    data.lastUpdate = new Date();

    setWeather((prev) => {
      const newWeather = prev.concat(data);
      setItem(newWeather);
      return newWeather;
    });
  }

  function findWeather(location: string = ""): void {
    try {
      weatherMutation.mutate(location);
      if (weatherMutation.isError) {
        if (weatherMutation.error instanceof Error) {
          throw weatherMutation.error;
        } else {
          throw new Error("WeatherProvider: an error occurred with useMutation");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("WeatherProvider: an unknown error occurred with useMutation");
      }
    }
  }

  function deleteWeather(areaName: string): void {
    setWeather((prev) => {
      const newWeather = prev.filter((item) => item.areaName !== areaName);
      setItem(newWeather);
      return newWeather;
    });
  }

  return (
    <WeatherContext.Provider value={{ weather, findWeather, deleteWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}
