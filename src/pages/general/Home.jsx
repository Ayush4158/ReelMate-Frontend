import { useState, useEffect } from "react";
import ReelFeed from "../../components/ReelFeed";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [likingVideoId, setLikingVideoId] = useState(null);
  const [savingVideoId, setSavingVideoId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch videos
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/food`, { withCredentials: true })
      .then((res) => {
        const data = res.data.foodItems.map(v => ({
          ...v,
          isLiked: v.isLiked || false,
          isSaved: v.isSaved || false,
        }));
        setVideos(data);
      })
      .catch(() => toast.error("Failed to fetch videos"))
      .finally(() => setLoading(false));
  }, []);

  // Like/Dislike toggle
  const likeVideo = async (item) => {
    setLikingVideoId(item._id);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/like`,
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                likeCount: res.data.likeCount,
                isLiked: res.data.isLiked,
              }
            : v
        )
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to like video");
    } finally {
      setLikingVideoId(null);
    }
  };

  // Save/Unsave toggle
  const saveVideo = async (item) => {
    setSavingVideoId(item._id);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/save`,
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                saveCount: res.data.saveCount,
                isSaved: res.data.isSaved,
              }
            : v
        )
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save video");
    } finally {
      setSavingVideoId(null);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {loading ? (
        <div className="flex items-center justify-center h-screen text-gray-400 text-lg">
          Loading videos...
        </div>
      ) : (
        <ReelFeed
          items={videos}
          onLike={likeVideo}
          onSave={saveVideo}
          likingVideoId={likingVideoId}
          savingVideoId={savingVideoId}
          emptyMessage="No videos available."
        />
      )}
    </div>
  );
};

export default Home;
