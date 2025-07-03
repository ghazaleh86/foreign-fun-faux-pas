
import React, { useState } from "react";

type MascotAvatarProps = {
  size?: number; // pixel size
  className?: string;
};

const MascotAvatar: React.FC<MascotAvatarProps> = ({ size = 100, className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the single working GIF URL
  const gifUrl = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzg1bW1lNW44azQ3bDc5MWIwM3pncHgyZW5zZTIwenlwZGFteDR5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CXWR55ees9JdvNblLW/giphy.gif";

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };
  
  return (
    <div
      className={`flex items-center justify-center rounded-full shadow-lg ring-4 ring-yellow-200 bg-yellow-100 mx-auto ${className}`}
      style={{ width: size, height: size, overflow: "hidden" }}
      aria-label="Mascot"
    >
      {imageError ? (
        // Fallback emoji mascot
        <div 
          className="text-center flex items-center justify-center"
          style={{ fontSize: size * 0.6 }}
        >
          🐿️
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="animate-pulse bg-yellow-200 w-full h-full rounded-full" />
          )}
          <img
            src={gifUrl}
            alt="Mascot"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: isLoading ? "none" : "block",
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            draggable={false}
          />
        </>
      )}
    </div>
  );
};

export default MascotAvatar;
