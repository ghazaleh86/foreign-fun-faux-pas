
import React from "react";

type MascotAvatarProps = {
  size?: number; // pixel size
  className?: string;
};

const MascotAvatar: React.FC<MascotAvatarProps> = ({ size = 100, className = "" }) => {
  // Randomly select one of the two Giphy URLs
  const gifs = [
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXJwamh6YXk2ZnppZHVzcWJyd2hxZnB1cGl5YnMwb25mYWl2emhuNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Go5rRm5kZu6jjDn0XT/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHNkbmh4YjJ0ZGN6NWdxN3ZrMjZzcjNjZnNuZjFraHExb3h3YndkayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4ZGRNIC9DgsiBVjlBS/giphy.gif"
  ];
  const selectedGif = gifs[Math.floor(Math.random() * gifs.length)];
  
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
