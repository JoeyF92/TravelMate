import React, { useState, useEffect } from "react";
// import mockGroups from "../mocks/data/groups.json";
import "./ImageCarousel.css"; // Make sure this contains your custom slideshow styles

const images = [
  {
    id: 1,
    title: "Goa",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1691486278/Final%20Project%20Mocks/goa_osarjt.jpg",
  },
  {
    id: 2,
    title: "Greece",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1691486277/Final%20Project%20Mocks/greece_il2fxu.jpg",
  },
  {
    id: 4,
    title: "Cornwall",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1691486276/Final%20Project%20Mocks/cornwall_l9wfrh.jpg",
  },
  {
    id: 5,
    title: "Weekend in Paris",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1691486276/Final%20Project%20Mocks/paris_nhhjcn.jpg",
  },
];

export default function ImageCarousel({ user_id }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   async function retrieveImages() {
  //     const response = await fetch(
  //       `http://127.0.0.1:5000/album/user/${user_id}`
  //     );
  //     const data = await response.json();
  //     setGroups(data);
  //     console.log(data);
  //   }

  return (
    <div className="slideshow">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`slide ${
            index === currentImageIndex ? "visible" : "hidden"
          }`}
        >
          <img src={image.img} alt={image.title} />

          <div className="image-title">{image.title}</div>
        </div>
      ))}
    </div>
  );
}
