
import React from "react";

type MascotAvatarProps = {
  size?: number; // pixel size
  className?: string;
};

const MascotAvatar: React.FC<MascotAvatarProps> = ({ size = 100, className = "" }) => (
  <div
    className={`flex items-center justify-center rounded-full shadow-lg ring-4 ring-yellow-200 bg-yellow-100 mx-auto ${className}`}
    style={{ width: size, height: size, overflow: "hidden" }}
    aria-label="Mascot"
  >
    <img
      src="/lovable-uploads/81430518-b265-4ae2-a0db-1bd9da147635.png"
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

export default MascotAvatar;
