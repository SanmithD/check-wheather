import CurrentWeather from "@/components/CurrentWeather";
import FavoriteCities from "@/components/FavoriteCities";
import HourlyTemp from "@/components/HourlyTemp";
import WeatherSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { UseGeoLocation } from "@/hooks/UseGeoLocation";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/UseWeather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

function WheatherDash() {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = UseGeoLocation();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if(coordinates){
        weatherQuery.refetch();
        forecastQuery.refetch();
        locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError} </p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit ">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access </p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit ">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if(weatherQuery.error || forecastQuery.error){
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Fail to fetch weather data. Please try again </p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit ">
            <RefreshCw className="mr-2 h-4 w-4" />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if(!weatherQuery.data || !forecastQuery.data){
    return <WeatherSkeleton/>
  }

  return (
    <div className="space-y-4" >
      <FavoriteCities  />
      <div className="flex items-center justify-between px-4 ">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button onClick={handleRefresh} disabled={weatherQuery.isFetching || forecastQuery.isFetching} variant={"outline"} size={"icon"}>
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}  `} />
        </Button>
      </div>

      <div className="grid gap-6 " >
        <div className="flex flex-col lg:flex-row gap-4" >
            <CurrentWeather data={weatherQuery.data} locationName={locationName}/>
            <HourlyTemp data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start" >
            <WeatherDetails data={weatherQuery.data}/>
            <WeatherForecast data={forecastQuery.data}/>
        </div>
      </div>
    </div>
  );
}

export default WheatherDash;
