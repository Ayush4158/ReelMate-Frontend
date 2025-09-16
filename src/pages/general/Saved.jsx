import { useEffect, useState } from "react";
import ReelFeed from "../../components/ReelFeed";
import axios from 'axios'

const Saved = () => {
  const [videos, setVideos] = useState([]);

  // Dummy fetch simulation (replace with API if needed)
useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/food/saved-video`, { withCredentials: true })
    .then((response) => {
      const data = response.data.savedVideo;
      setVideos(data)
    });
}, []);


const removeSaved = async (item) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/food/save`,
      { foodId: item._id },
      { withCredentials: true }
    );

    // ✅ Remove the unsaved video from the state array
    setVideos((prev) => prev.filter((v) => v._id !== item._id));
  } catch (error) {
    console.error("Error removing saved video:", error);
  }
};


  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ReelFeed
        items={videos}
        onSave={removeSaved}
        emptyMessage="No saved videos yet."
      />
    </div>
  );
};

export default Saved;
