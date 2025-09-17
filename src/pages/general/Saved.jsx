import { useEffect, useState } from "react";
import ReelFeed from "../../components/ReelFeed";
import axios from "axios";
import { toast } from "react-toastify";

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingVideoId, setSavingVideoId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/food/saved-video`, { withCredentials: true })
      .then((res) => {
        const data = res.data.savedVideo.map(v => ({
          ...v,
          isLiked: v.isLiked || false,
          isSaved: true,
        }));
        setVideos(data);
      })
      .catch(() => toast.error("Failed to fetch saved videos"))
      .finally(() => setLoading(false));
  }, []);

  const removeSaved = async (item) => {
    setSavingVideoId(item._id);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/save`,
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map(v =>
          v._id === item._id
            ? { ...v, isSaved: res.data.isSaved, saveCount: res.data.saveCount }
            : v
        ).filter(v => v.isSaved)
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove saved video");
    } finally {
      setSavingVideoId(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {loading ? (
        <div className="flex items-center justify-center h-screen text-gray-400 text-lg">
          Loading saved videos...
        </div>
      ) : (
        <ReelFeed
          items={videos}
          onSave={removeSaved}
          savingVideoId={savingVideoId}
          emptyMessage="No saved videos yet."
        />
      )}
    </div>
  );
};

export default Saved;
