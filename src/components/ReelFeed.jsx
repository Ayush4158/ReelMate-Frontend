import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ReelFeed = ({
  items = [],
  onLike,
  onSave,
  likingVideoId,
  savingVideoId,
  emptyMessage = "No videos yet.",
}) => {
  const videoRefs = useRef(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.8] }
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [items]);

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div
        className="snap-y snap-mandatory overflow-y-scroll h-full w-full pb-24 scroll-smooth"
        style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }}
        role="list"
      >
        {items.length === 0 && (
          <div className="flex items-center justify-center h-screen text-gray-400 text-lg">
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => {
          const isLiking = likingVideoId === item._id;
          const isSaving = savingVideoId === item._id;

          return (
            <section
              key={item._id}
              className="relative w-full h-screen flex items-center justify-center bg-black snap-start"
              role="listitem"
            >
              <video
                ref={setVideoRef(item._id)}
                className="w-full h-full object-cover"
                src={item.video}
                muted
                playsInline
                loop
                preload="metadata"
              />

              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                {/* Actions */}
                <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6 text-white">
                  {/* Like */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={onLike ? () => onLike(item) : undefined}
                      disabled={isLiking}
                      className={`p-3 rounded-full bg-white/20 hover:bg-white/30 transition ${
                        isLiking ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      aria-label="Like"
                    >
                      {item.isLiked ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="red"
                          stroke="red"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6"
                        >
                          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6"
                        >
                          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                        </svg>
                      )}
                    </button>
                    <div className="text-sm mt-1">{item.likeCount ?? 0}</div>
                  </div>

                  {/* Save */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={onSave ? () => onSave(item) : undefined}
                      disabled={isSaving}
                      className={`p-3 rounded-full bg-white/20 hover:bg-white/30 transition ${
                        isSaving ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      aria-label="Bookmark"
                    >
                      {item.isSaved ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="yellow"
                          stroke="yellow"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6"
                        >
                          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6"
                        >
                          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                        </svg>
                      )}
                    </button>
                    <div className="text-sm mt-1">{item.saveCount ?? 0}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-28 left-4 text-white max-w-md">
                  <p className="text-sm mb-2 line-clamp-2" title={item.description}>
                    {item.description}
                  </p>
                  {item.foodPartner && (
                    <Link
                      to={`/food-partner/${item.foodPartner}`}
                      className="px-3 py-1 bg-blue-600 rounded-md text-sm font-medium hover:bg-blue-500 transition"
                      aria-label="Visit store"
                    >
                      Visit store
                    </Link>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ReelFeed;
