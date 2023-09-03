import React, { useState, useRef, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { format } from "date-fns";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import axios from "axios";

const baseUrl = "http://127.0.0.1:5000";

export default function NewGroupForm() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    groupName: "",
    location: "",
    startDate: null,
    endDate: null,
    members: localStorage.user_id,
    description: "",
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStartDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: date,
    }));
  };

  const handleEndDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      endDate: date,
    }));
  };

  const handleImageUpload = async (event) => {
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
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/album/${localStorage.user_id}`,
        {
          title: formData.groupName,
          location: formData.location,
          members: localStorage.user_id,
          start_date: format(formData.startDate, "yyyy-MM-dd HH:mm:ss XXXX"),
          end_date: format(formData.endDate, "yyyy-MM-dd HH:mm:ss XXXX"),
          description: formData.description,
          image: formData.image,
        }
      );
      console.log("Response:", response.data);
      const group_id = response.data.group_id;
      navigate(`${group_id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [formStatus, setFormStatus] = useState("hidden");

  const formDisplayFunction = (event) => {
    const groupFormElement = document.querySelector(".create-form");
    const formTitle = document.querySelector(".create-form-title");
    const button = event.target;
    if (formStatus == "hidden") {
      groupFormElement.classList = "grow-item create-form";
      button.textContent = "x";
      button.classList = "x-button";
      setFormStatus("visible");
    } else {
      groupFormElement.classList = "hide-item create-form display-none";
      button.textContent = "Create Group";
      button.classList = "create-button";
      setFormStatus("hidden");
    }
  };

  return (
    <div className="new-form-container">
      <div className="new-form-wrapper">
        <div className="new-group-form" ref={formRef}>
          {formStatus === "hidden" && (
            <label className="new-form-label" id="create-form-title">
              Start a New Group:
            </label>
          )}

          <button className="create-button" onClick={formDisplayFunction}>
            Create
          </button>
          <form className={"create-form  display-none"} onSubmit={handleSubmit}>
            <div className="new-form-group">
              <label className="new-form-label" htmlFor="groupName">
                Group Name:
              </label>
              <input
                type="text"
                className="new-form-text-input"
                id="groupName"
                name="groupName"
                value={formData.groupName}
                onChange={handleInputChange}
              />
            </div>
            <div className="new-form-group">
              <label className="new-form-label" htmlFor="location">
                Location:
              </label>
              <input
                type="text"
                className="new-form-text-input"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="new-form-group">
              <label className="new-form-label">Date Range:</label>
              <div className="date-picker-container">
                <DatePicker
                  className="new-form-date-picker"
                  selected={formData.startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  // locale="en-GB"
                  dateFormat="dd MMM yyyy"
                />
                <span>to</span>
                <DatePicker
                  className="new-form-date-picker"
                  selected={formData.endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  minDate={formData.startDate}
                  dateFormat="dd MMM yyyy"
                  // locale="en-GB"
                />
              </div>
            </div>
            <div className="new-form-group">
              <label className="new-form-label" htmlFor="description">
                Description:
              </label>
              <textarea
                id="description"
                className="new-form-textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="new-form-group">
              <label className="new-form-label" htmlFor="image">
                Image:
              </label>
              <input
                className="new-form-file-input"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {formData.image && (
                <Image cloudName="dwxery2ci" publicId={formData.image} />
              )}
            </div>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
