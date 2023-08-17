import React, { useEffect, useState } from "react";
import config from "../../config";
import axios from "axios";
// import Image from "react-bootstrap/Image";
import { Image } from "cloudinary-react";
const baseUrl = "http://127.0.0.1:5000";

export default function UserProfileCard() {
  const userId = localStorage.getItem("user_id");
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(`${config.baseUrl}/user/${userId}`);
        if (response.status === 200) {
          setUser(response.data);
          console.log(user);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    }

    getUserInfo();
  }, []);

  useEffect(() => {
    const savedImageData = localStorage.getItem("profile_picture");
    if (savedImageData) {
      setSelectedImage(savedImageData);
    }
  }, []);

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ml_default");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwxery2ci/image/upload?folder=AItinery",
        formData
      );
      if (response.data.secure_url) {
        console.log(response.data.secure_url);
        try {
          const response = await axios.put(
            `${baseUrl}/user/profile-pic/${localStorage.user_id}`,
            {
              profile_pic: response.data.secure_url,
            }
          );
          console.log("Response:", response.data);
          setSelectedImage(response.data.secure_url);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    // reader.onload = function () {
    //   setSelectedImage(reader.result);
    //   localStorage.setItem("profile_picture", reader.result);
    // };
    // reader.readAsDataURL(file);
  };

  if (!user) {
    return <p className="loading-message">Loading user information...</p>;
  }

  return (
    <div className="col">
      <div className="profile-top d-flex align-items-center flex-column">
        <div className="image-container">
          <Image
            src={
              selectedImage ||
              "https://img.icons8.com/?size=512&id=ABBSjQJK83zf&format=png"
            }
            style={{ width: "200px", height: "200px" }}
            roundedCircle
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="fileInput"
            style={{ display: "none" }}
          />
        </div>
        <button
          className="button-picture"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Change Picture
        </button>
        <p className="username">{user.username}</p>
      </div>

          <div className="profile-detail">
            <label className="block text-lg font-primary" data-testid="full-name-element">
              Full Name:
            </label>
            <p>{user.first_name} {user.last_name}</p>
          </div>
          
          <div className="profile-detail">
            <label className="block text-lg font-primary">
              Email:
            </label>
            <p>{user.email}</p>
          </div>
          <p>Full</p>
        </div>
    )

}
