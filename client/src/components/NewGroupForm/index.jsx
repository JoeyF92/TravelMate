import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

export default function NewGroupForm() {
  const formRef = useRef(null);

  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (formRef.current && !formRef.current.contains(event.target)) {
  //         formRef.current.classList.remove("grow-item");
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);

  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     document
  //       .querySelector(".create-button")
  //       .addEventListener("click", formDisplayFunction);
  //     return () => {
  //       document
  //         .querySelector(".create-button")
  //         .removeEventListener("click", formDisplayFunction);
  //     };
  //   }, []);

  const [formData, setFormData] = useState({
    groupName: "",
    startDate: null,
    endDate: null,
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

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted data:", formData);
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

  //   const handleCreateButtonClick = (event) => {
  //     const groupFormElement = document.querySelector(".create-form");
  //     groupFormElement.classList = "grow-item create-form";

  //     const button = event.target;
  //     button.textContent = "x";
  //     button.classList = "hide-form";
  //     button.addEventListener("click", HideCreateForm);
  //   };

  //   const HideCreateForm = (event) => {
  //     const groupFormElement = document.querySelector(".create-form");
  //     groupFormElement.classList = "hide-item create-form display-none";
  //     const button = document.querySelector(".hide-form");
  //     button.textContent = "Create Group";
  //   };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="group-form" ref={formRef}>
          {formStatus === "hidden" && (
            <label id="create-form-title">Create a New Group</label>
          )}

          <button className="create-button" onClick={formDisplayFunction}>
            Create
          </button>
          <form className={"create-form  display-none"} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="groupName">Group Name:</label>
              <input
                type="text"
                id="groupName"
                name="groupName"
                value={formData.groupName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Date Range:</label>
              <div className="date-picker-container">
                <DatePicker
                  selected={formData.startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                />
                <span>to</span>
                <DatePicker
                  selected={formData.endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  minDate={formData.startDate}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
              />
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
