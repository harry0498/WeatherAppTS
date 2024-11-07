import { WeatherProvider, CelsiusProvider } from "@/contexts";
import { Nav, NewLocation, Weather } from "@/components";

function App() {
  return (
    <>
      <CelsiusProvider>
        <Nav />
        <div className="container max-w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          <WeatherProvider>
            <NewLocation key="new" />
            <Weather />
          </WeatherProvider>
        </div>
      </CelsiusProvider>
    </>
  );
}

export default App;
