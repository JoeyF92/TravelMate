import React, { useState, useEffect } from "react";
// import mockGroups from "../mocks/data/groups.json";
import "./ImageCarousel.css"; // Make sure this contains your custom slideshow styles

//stock images incase fetch request fails
const images = [
  {
    id: 1,
    // title: "Goa",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1691486278/Final%20Project%20Mocks/goa_osarjt.jpg",
  },
  {
    id: 2,
    // title: "Greece",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1691486277/Final%20Project%20Mocks/greece_il2fxu.jpg",
  },
  {
    id: 4,
    // title: "Cornwall",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1691486276/Final%20Project%20Mocks/cornwall_l9wfrh.jpg",
  },
  {
    id: 5,
    // title: "Weekend in Paris",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1691486276/Final%20Project%20Mocks/paris_nhhjcn.jpg",
  },
];

export default function ImageCarousel({ user_id }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [UserImages, SetUserImages] = useState([]);

  //animation effect for the image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // retrieving images for the carousel - based in userid
  useEffect(() => {
    async function retrieveImages() {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/user/content/${user_id}`
        );
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          SetUserImages(data); // Set UserImages only if data is not empty
          console.log(UserImages);
        } else {
          console.log(
            "Fetch returned empty data or failed. Using default images."
          );
          SetUserImages(images); // Set UserImages to default images
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Using default images due to fetch error.");
        SetUserImages(images); // Set UserImages to default images
      }
    }

    retrieveImages();
  }, []);

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

          {image.title && <div className="image-title">{image.title}</div>}
        </div>
      ))}
    </div>
  );
}
