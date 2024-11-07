import { Weather } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { TrashIcon } from "@radix-ui/react-icons";
import { useCelsius, useWeather } from "@/contexts";

type WeatherProps = {
  data: Weather;
};

function WeatherCard({ data }: WeatherProps): JSX.Element {
  const { celsius } = useCelsius();
  const { deleteWeather } = useWeather();
  const temp = celsius ? data?.tempC : data?.tempF;

  /**
   * Formats the temperature
   *
   * @param {number} temp - The temperature value (default is 0)
   * @returns {string} The formatted temperature string
   */
  function displayTemp(temp: number = 0): string {
    return celsius ? `${temp}°C` : `${temp}°F`;
  }

  /**
   * Formats the timestamp
   *
   * @param {string} time - The timestamp to format
   * @returns {string} The formatted time string
   */
  function formatTime(time: Date): string {
    return new Date(time).toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <Card className="m-4 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{data?.areaName}</CardTitle>
        <CardDescription>{data?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="table-fixed table-small">
          <TableBody>
            <TableRow>
              <TableCell className="text-left">Now:</TableCell>
              <TableCell className="text-right">{displayTemp(temp?.cur)}</TableCell>
              <TableCell className="text-left">Hum:</TableCell>
              <TableCell className="text-right">{data?.humidity}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-left">Max:</TableCell>
              <TableCell className="text-right">{displayTemp(temp?.max)}</TableCell>
              <TableCell className="text-left">Rain:</TableCell>
              <TableCell className="text-right">{data?.precipMM}mm</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-left">Min:</TableCell>
              <TableCell className="text-right">{displayTemp(temp?.min)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-between">
        <div>
          <TrashIcon
            className="size-5 stroke-red-500 cursor-pointer"
            onClick={() => deleteWeather(data?.areaName)}
          />
        </div>
        <div className="text-xs">Last updated: {formatTime(data?.lastUpdate)}</div>
      </CardFooter>
    </Card>
  );
}

export default WeatherCard;
