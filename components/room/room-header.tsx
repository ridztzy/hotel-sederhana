import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function RoomHeader({ room }: { room: any }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">{room.name}</h1>
      <div className="flex items-center gap-3 mb-2">
        <Badge variant="secondary" className="capitalize">{room.type}</Badge>
        <span className="flex items-center gap-1 text-yellow-500 font-medium">
          <Star className="w-4 h-4" /> {room.rating}
          <span className="text-muted-foreground text-xs">({room.reviewCount} reviews)</span>
        </span>
      </div>
      <p className="text-muted-foreground max-w-2xl">{room.shortDescription}</p>
    </div>
  );
}