import { Card } from '@/components/ui/card';
import Image from 'next/image';

export default function RoomGallery({ images, name }: { images: string[]; name: string }) {
  return (
    <div className="md:w-1/2 space-y-4">
      <Card className="overflow-hidden shadow-lg">
        <Image
          src={images[0]}
          alt={name}
          width={600}
          height={400}
          className="object-cover w-full h-72"
          priority
        />
      </Card>
      <div className="flex gap-2">
        {images.slice(1).map((img, i) => (
          <Card key={i} className="overflow-hidden">
            <Image
              src={img}
              alt={`${name} ${i + 2}`}
              width={120}
              height={80}
              className="object-cover rounded-md"
            />
          </Card>
        ))}
      </div>
    </div>
  );
}