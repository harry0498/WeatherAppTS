import { useWeather } from "@/contexts";
import { Spinner, WeatherCard } from "@/components";

export default function Weather(): JSX.Element {
  const { weather } = useWeather();
  const isLoading = false;

  return (
    <>
      {!isLoading &&
        weather.map((data, index) => <WeatherCard key={index} data={data} />)}
      {isLoading && <Spinner />}
    </>
  );
}
