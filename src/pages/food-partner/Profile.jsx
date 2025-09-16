import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/food-partner/${id}`, {withCredentials: true})
    .then(response => {
      setProfile(response.data.foodPartner)
      setVideos(response.data.foodPartner.foodItems)
    })
  }, [id]);

  return (
    <main className="flex flex-col w-full p-6">
      {/* Profile Header */}
      <section className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=200"
            alt="avatar"
          />
          <div>
            <h1 className="text-xl font-semibold">{profile?.name}</h1>
            <p className="text-gray-500">{profile?.address}</p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="text-center">
            <span className="block text-sm text-gray-500">total meals</span>
            <span className="text-lg font-bold">{profile?.totalMeals}</span>
          </div>
          <div className="text-center">
            <span className="block text-sm text-gray-500">
              customers served
            </span>
            <span className="text-lg font-bold">{profile?.customersServed}</span>
          </div>
        </div>
      </section>

      <hr className="my-6 border-gray-200" />

      {/* Video Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {videos.map((v, index) => (
          <div key={index} className="w-full h-48 rounded-lg overflow-hidden">
            <video
              className="w-full h-full object-cover"
              src={v.video}
              muted
              controls
            ></video>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Profile;
