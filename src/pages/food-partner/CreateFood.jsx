import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!videoFile) {
      setVideoURL("");
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setFileError("Please select a valid video file.");
      return;
    }
    setFileError("");
    setVideoFile(file);
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!videoFile) {
    toast.error("Please select a video before submitting.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("video", videoFile);

  try {
    await toast.promise(
      axios.post(`${import.meta.env.VITE_API_URL}/api/food`, formData, { withCredentials: true }),
      {
        pending: "Uploading video...",
        success: "Food created successfully 🎉",
        error: "Failed to create food. Please try again ❌",
      }
    );

    setName("");
    setDescription("");
    setVideoFile(null);
  } catch (err) {
    console.error("Upload failed:", err);
    toast.error(`Error: ${err.message}`);
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Create Food</h1>
          <p className="text-gray-600">
            Upload a short video, give it a name, and add a description.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Food Video
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={onFileChange}
            />

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500"
              onClick={openFileDialog}
            >
              <p className="text-gray-600">
                <strong>Click to upload</strong> or drag and drop
              </p>
              <p className="text-xs text-gray-400">MP4, WebM, MOV • Up to 100MB</p>
            </div>

            {fileError && (
              <p className="text-sm text-red-600 mt-2">{fileError}</p>
            )}

            {videoFile && (
              <div className="mt-3 flex items-center gap-3 bg-gray-100 rounded-lg p-3">
                <span className="text-sm font-medium">{videoFile.name}</span>
                <span className="text-xs text-gray-500">
                  {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                </span>
                <button
                  type="button"
                  className="text-xs text-red-500 ml-auto"
                  onClick={() => setVideoFile(null)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Preview */}
          {videoURL && (
            <div className="mt-4">
              <video
                className="w-full rounded-lg border"
                src={videoURL}
                controls
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Spicy Paneer Wrap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Save Food
            </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
