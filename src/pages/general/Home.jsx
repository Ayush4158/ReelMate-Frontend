import { useState, useEffect } from "react";
import ReelFeed from "../../components/ReelFeed";
import axios from "axios"

const Home = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/food`, {withCredentials: true})
    .then(response => {
      setVideos(response.data.foodItems);
      // console.log(videos)   
    })
    console.log(import.meta.env.VITE_API_URL)
  }, []);

  const likeVideo = async (item) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/like`, {foodId: item._id}, {withCredentials: true})
    console.log(res.data)

    setVideos((prev) =>
  prev.map((v) =>
    v._id === item._id ? { ...v, likeCount: res.data.likeCount } : v
  ))
  };

  const saveVideo = async (item) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/save`, {foodId: item._id}, {withCredentials: true})

    setVideos((prev) =>
  prev.map((v) =>
    v._id === item._id ? { ...v, saveCount: res.data.saveCount } : v
  )
);

  };

  return (
    <div className="flex flex-col items-center w-full">
      <ReelFeed
        items={videos}
        onLike={likeVideo}
        onSave={saveVideo}
        emptyMessage="No videos available."
      />
    </div>
  );
};

export default Home;
