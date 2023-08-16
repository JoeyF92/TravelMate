import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";

import axios from "axios";
import Modal from "react-bootstrap/Modal";

import "./styles.css";
const baseUrl = "http://127.0.0.1:5000";

export default function AlbumUpload({ album_id, onUpload }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setFormData({
      description: "",
      image: null,
      photo: null,
      tags: "",
    });
    setShow(false);
  };

  const handleClick = () => {
    setShow(true);
  };

  const [formData, setFormData] = useState({
    description: "",
    image: null,
    photo: null,
    tags: "Test",
  });

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageSelect = async (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ml_default"); // Set your upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwxery2ci/image/upload?folder=AItinery",
        formData
      );

      // Set the Cloudinary URL in the form data
      setFormData((prevData) => ({
        ...prevData,
        image: response.data.secure_url,
        photo: response.data.secure_url,
      }));
      console.log("Image URL:", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUpload = async () => {
    try {
      if (text || formData.image) {
        setFormData((prevData) => ({
          ...prevData,
          description: text,
        }));
        setSubmitted(true); // Mark the form as submitted
      }
    } catch (error) {
      console.error("Upload error:", error);
      console.error("Error response:", error.response);
    }
  };

  // Set up a useEffect to listen for formData changes
  useEffect(() => {
    console.log("formData changed:", formData);

    if (submitted) {
      const postResponse = axios.post(
        `${baseUrl}/content/${album_id}`,
        formData
      );

      // Handle post response as needed
      postResponse
        .then((response) => {
          console.log("Upload success:", response.data);
          setFormData({
            description: "",
            image: null,
            photo: null,
            tags: "",
          });

          onUpload();

          handleClose();
          setSubmitted(false); // Reset the submitted state
        })
        .catch((error) => {
          console.error("Upload error:", error);
          console.error("Error response:", error.response);
        });
    }
  }, [formData.image, formData.description, submitted]);

  return (
    <>
      <button className="upload-asset-button" onClick={handleClick}>
        Upload
      </button>
      <Modal
        className="fade-in"
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
        size="m"
      >
        <Modal.Body className="upload-asset-modal registrationModal">
          <label
            className="block text-sm font-primary leading-6 text-gray-900"
            htmlFor="fileInput"
          >
            Upload an image or video:
          </label>
          <input
            className="block text-sm font-primary leading-6 text-gray-900"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageSelect}
          />
          {formData.image && (
            <Image cloudName="dwxery2ci" publicId={formData.image} />
          )}

          <label
            className="block text-sm font-primary leading-6 text-gray-900"
            htmlFor="descriptionTextarea"
          >
            Enter a description or a memory from the trip:
          </label>
          <textarea
            id="descriptionTextarea"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your text here"
            className="location-input block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"
          ></textarea>
          <button
            className="mt-4 mb-4 flex w-full justify-center rounded-md bg-theme-blue px-3 py-1.5 text-sm font-primary leading-6 text-white shadow-sm hover:opacity-75"
            onClick={handleUpload}
          >
            Upload
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
