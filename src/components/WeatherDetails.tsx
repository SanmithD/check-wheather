import type { WeatherData } from "@/api/Types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailsProps{
    data: WeatherData;
}

function WeatherDetails({ data }:WeatherDetailsProps) {

    const { wind, main, sys } = data;

    const formatTime = (timestamp: number) =>{
        return format(new Date(timestamp * 1000),"h:mm a");
    };

    const getWindDirection = (degree:number) =>{
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
        return directions[index];
    }

    const details = [
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        },
        {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500"
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.deg})°`,
            icon: Compass,
            color: "text-green-500"
        },
        {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-500"
        },
    ]

  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2" >
                { details.map((details)=>(
                    <div key={details.title} className="flex items-center gap-3 rounded-lg border p-4" >
                        <details.icon className={`h-5 w-5 ${details.color}`} />
                        <div>
                            <p className="text-sm font-medium leading-none" >{details.title} </p>
                            <p className="text-sm text-muted-foreground" >{details.value} </p>
                        </div>
                    </div>
                )) }
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default WeatherDetails