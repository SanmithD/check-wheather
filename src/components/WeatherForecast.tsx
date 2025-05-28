import type { ForecastData } from "@/api/Types";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherForecastProps{
    data: ForecastData
}

interface DailyForecasts{
    date:number,
    temp_min: number,
    temp_max: number,
    humidity: number,
    wind: number,
    weather:{
        id: number,
        main: string,
        description: string,
        icon: string
    };
}

function WeatherForecast({ data }: WeatherForecastProps) {

    const dailyForecasts = data.list.reduce((acc, forecast)=>{
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
        if(!acc[date]){
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            }
        }else{
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }
        return acc;
    },{} as Record<string, DailyForecasts> );

    const nextDays = Object.values(dailyForecasts).slice(0,6);

    const formatTemp = (temp:number) =>`${Math.round(temp - 273.15 )}°`

  return (
    <Card>
        <CardHeader>
            <CardTitle>
                5 Day Forecast
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-3" >
                {
                    nextDays.map((day)=>(
                        <div key={day.date} className="grid grid-cols-2 items-center gap-4 rounded-lg border p-4" >
                            <div>
                                <p className="font-medium" >{format(new Date(day.date * 1000), "EEE, MMM d")} </p>
                                <p className="text-sm text-muted-foreground capitalize" >{day.weather.description} </p>
                            </div>
                            <div className="flex justify-center gap-4" >
                                <span className="flex items-center text-blue-500" >
                                    <ArrowDown className="mr-1 h-4 w-4" />
                                    {formatTemp(day.temp_min)}
                                </span>
                                <span className="flex items-center text-red-500" >
                                    <ArrowUp className="mr-1 h-4 w-4" />
                                    {formatTemp(day.temp_max)}
                                </span>
                            </div>
                            <div className="flex justify-center gap-4" >
                                <span className="flex items-center text-blue-500" >
                                    <Droplets className="mr-1 h-4 w-4" />
                                    {formatTemp(day.humidity)}%
                                </span>
                                <span className="flex items-center text-green-500" >
                                    <Wind className="mr-1 h-4 w-4" />
                                    {formatTemp(day.wind)}m/s
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </CardContent>
    </Card>
  )
}

export default WeatherForecast