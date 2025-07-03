// filepath: c:\projectku\web-hotel\pages\RoomDetail.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { fetchRoomDetails } from '@/api/room'; // Assume you have an API function to fetch room details
import { Toast } from '@/components/ui/toast'; // Import your toast component if needed

const RoomDetail: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query; // Get roomId from the URL
  const [room, setRoom] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (roomId) {
      const getRoomDetails = async () => {
        try {
          const roomData = await fetchRoomDetails(roomId);
          setRoom(roomData);
        } catch (err) {
          setError('Failed to load room details');
        } finally {
          setLoading(false);
        }
      };

      getRoomDetails();
    }
  }, [roomId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <Toast title="Error" description={error} />;

  return (
    <div className="room-detail">
      <h1>{room.title}</h1>
      <img src={room.imageUrl} alt={room.title} />
      <p>{room.description}</p>
      <h2>Amenities</h2>
      <ul>
        {room.amenities.map((amenity) => (
          <li key={amenity}>{amenity}</li>
        ))}
      </ul>
      <button onClick={() => alert('Booking functionality to be implemented')}>
        Book Now
      </button>
    </div>
  );
};

export default RoomDetail;