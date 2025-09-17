import { useState, useEffect } from "react";
import ReelFeed from "../../components/ReelFeed";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [likingVideoId, setLikingVideoId] = useState(null);
  const [savingVideoId, setSavingVideoId] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/food`, { withCredentials: true })
      .then((response) => setVideos(response.data.foodItems))
      .catch(() => toast.error("Failed to fetch videos"));
  }, []);

  const likeVideo = async (item) => {
    setLikingVideoId(item._id); // disable like button for this video
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/like`,
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: res.data.likeCount } : v
        )
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to like video");
    } finally {
      setLikingVideoId(null); // re-enable button
    }
  };

  const saveVideo = async (item) => {
    setSavingVideoId(item._id); // disable save button for this video
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/save`,
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, saveCount: res.data.saveCount } : v
        )
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save video");
    } finally {
      setSavingVideoId(null); // re-enable button
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <ReelFeed
        items={videos}
        onLike={likeVideo}
        onSave={saveVideo}
        likingVideoId={likingVideoId}
        savingVideoId={savingVideoId}
        emptyMessage="No videos available."
      />
    </div>
  );
};

export default Home;
