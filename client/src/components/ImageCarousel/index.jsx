import React, { useState, useEffect } from "react";
// import mockGroups from "../mocks/data/groups.json";
import "./ImageCarousel.css"; // Make sure this contains your custom slideshow styles

//stock images incase fetch request fails
const images = [
  {
    id: 1,
    // title: "Paris",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1692200003/AItinery/pexels-marcos-abreu-3631051_i1n02s.jpg",
  },
  {
    id: 2,
    // title: "Maldives",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1692199729/AItinery/pexels-asad-photo-maldives-15883365_ffmbh5.jpg",
  },
  {
    id: 3,
    // title: "Italy",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1692204776/AItinery/pexels-anastasiya-lobanovskaya-804954_jpd0eo.jpg",
  },
  {
    id: 4,
    // title: "Japan",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1692204889/AItinery/pexels-aleksandar-pasaric-2506923_unhmpv.jpg",
  },
  {
    id: 5,
    // title: "Greece",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1692199217/AItinery/pexels-aleksandar-pasaric-1285625_sajlxs.jpg",
  },
  {
    id: 6,
    // title: "NY",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1692205193/AItinery/pexels-david-iglesias-13356911_bva3vp.jpg",
  },
  {
    id: 7,
    // title: "Lisbon",
    img: "https://res.cloudinary.com/dwxery2ci/image/upload/v1692205112/AItinery/pexels-lisa-fotios-1534560_ffb3pp.jpg",
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
