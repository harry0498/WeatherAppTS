import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCelsius } from "@/contexts";

function Nav(): JSX.Element {
  const { celsius, toggleCelsius } = useCelsius();

  return (
    <div className="p-3 bg-muted flex justify-between">
      <h1 className="font-bold">Weather App</h1>
      <div className="flex items-center space-x-2">
        <Label htmlFor="celsiusToggle">{celsius ? "Celsius" : "Fahrenheit"}</Label>
        <Switch id="celsiusToggle" checked={celsius} onClick={toggleCelsius} />
      </div>
    </div>
  );
}

export default Nav;
