import type { WeatherData } from "@/api/Types";
import { UseFavorite } from "@/hooks/UseFavorite";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface FavoriteProps{
    data: WeatherData;
}

function Favorite({ data }:FavoriteProps) {

    const { addToFavorites, removeFavorite, isFavorite } = UseFavorite();
    
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleToggleFavorite = () => {
        if(isCurrentlyFavorite){
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from favorites`);
        }else{
            addToFavorites.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            });
            toast.success(`Added ${data.name} to favorites `);
        }

    }

  return (
    <Button onClick={handleToggleFavorite} variant={isCurrentlyFavorite ? "default" : "outline"} size={"icon"} className={`${isCurrentlyFavorite} ? "bg-yellow-500 hover:bg-yellow-600 " : ""`}  >
        <Star className={`h-4 w-4 ${isCurrentlyFavorite} ? "fill-current" : "" `} />
    </Button>
  )
}

export default Favorite