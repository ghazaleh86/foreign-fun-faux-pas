
import React from "react";
import mascotGif1 from "@/assets/mascot-1.gif";
import mascotGif2 from "@/assets/mascot-2.gif";

type MascotAvatarProps = {
  size?: number; // pixel size
  className?: string;
};

const MascotAvatar: React.FC<MascotAvatarProps> = ({ size = 100, className = "" }) => {
  // Randomly select one of the two gifs
  const selectedGif = Math.random() > 0.5 ? mascotGif1 : mascotGif2;
  
  return (
    <div
      className={`flex items-center justify-center rounded-full shadow-lg ring-4 ring-yellow-200 bg-yellow-100 mx-auto ${className}`}
      style={{ width: size, height: size, overflow: "hidden" }}
      aria-label="Mascot"
    >
      <img
        src={selectedGif}
        alt="Mascot"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        draggable={false}
      />
    </div>
  );
};

export default MascotAvatar;
