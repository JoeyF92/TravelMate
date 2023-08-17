import React, { useState, useEffect } from "react";
import mockGroups from "../mocks/data/groupcontent.json";
import { useParams } from "react-router-dom";
import {
  AlbumUploader,
  ItineraryGenerator,
  AiSuggestion,
} from "../../components";

import Masonry from "react-masonry-css";
import "./styles.css";

export default function GroupInfo() {
  const [groupInfo, setGroupInfo] = useState([]);
  const [groupContent, setGroupContent] = useState([]);
  const { id: album_id } = useParams();
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  //Function for shuffling retrieved images, so they are in random order on page
  function shuffleArray(array) {
    const shuffledArray = [...array]; // Create a copy of the original array to shuffle

    // Find an entry with an image to start
    let startIndex = shuffledArray.findIndex((entry) => entry.img);

    // If no entry with an image is found, start at index 0
    if (startIndex === -1) {
      startIndex = 0;
    }

    // Shuffle the array, but start from the chosen index
    for (let i = shuffledArray.length - 1; i > startIndex; i--) {
      const j = Math.floor(Math.random() * (i - startIndex + 1)) + startIndex;
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }

  //functions for reformatting the dates:
  const calculateNightCount = () => {
    if (groupInfo.start_date && groupInfo.end_date) {
      const start = new Date(groupInfo.start_date);
      const end = new Date(groupInfo.end_date);
      return Math.floor((end - start) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });

    const getDayWithSuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return `${day}th`;
      }
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    return `${getDayWithSuffix(day)} ${month}`;
  };

  // copy to clipboard feature:
  const copyCodeToClipboard = () => {
    const codeToCopy = groupInfo.share_code;
    navigator.clipboard.writeText(codeToCopy).then(
      () => {
        setIsCodeCopied(true);
        setTimeout(() => setIsCodeCopied(false), 2000); // Reset after 2 seconds
      },
      (error) => {
        console.error("Failed to copy code: ", error);
      }
    );
  };

  // Retrieve group information on page load
  useEffect(() => {
    async function FetchGroupInfo() {
      const response = await fetch(`http://127.0.0.1:5000/album/${album_id}`);
      const data = await response.json();
      setGroupInfo(data);
    }
    FetchGroupInfo();
  }, []);

  // Function for fetching all group content
  const fetchGroupContent = async () => {
    console.log("calling fetch");
    const response = await fetch(`http://127.0.0.1:5000/content/album/1`);
    const data = await response.json();
    const shuffledData = shuffleArray(data);
    setGroupContent(shuffledData);
  };

  //fetch group content on page load
  useEffect(() => {
    // Fetch group content when the component mounts
    fetchGroupContent();
  }, []);

  // Callback function to update groupContent when new content is uploaded via AlbumUploader component
  const handleUpload = () => {
    console.log("calling fetch group");
    fetchGroupContent();
  };

  return (
    <>
      <div className="group-info-section">
        {groupInfo ? (
          <div className="group-info-section-left">
            <div className="group-info-section-photo">
              <img src={groupInfo.cover_photo}></img>
            </div>
            <div className="group-info-section-left-content">
              <div>
                <h1>
                  {groupInfo.title}{" "}
                  {groupInfo.location && (
                    <span id="location-span">({groupInfo.location})</span>
                  )}
                </h1>
                {groupInfo.description && <p>{groupInfo.description}</p>}
                {/* {groupInfo.members && <p>Members: {groupInfo.members}</p>} */}
                {groupInfo.start_date && groupInfo.end_date && (
                  <p>
                    {formatDate(new Date(groupInfo.start_date))} -{" "}
                    {formatDate(new Date(groupInfo.end_date))}
                    {` (${calculateNightCount()} nights)`}
                  </p>
                )}
                {groupInfo.share_code && (
                  <div>
                    <p>
                      Add members with share code: {groupInfo.share_code}{" "}
                      <button
                        id="clipboard-button"
                        onClick={copyCodeToClipboard}
                      >
                        📋Copy
                      </button>
                    </p>

                    {isCodeCopied && <p>Code copied to clipboard!</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="group-info-section-left">
            <p>Loading...</p>
          </div>
        )}
        <div className="group-info-section-right">
          <div>
            <AlbumUploader album_id={album_id} onUpload={handleUpload} />
          </div>
          <div>
            <ItineraryGenerator album_id={album_id} />
          </div>
          <div>
            <AiSuggestion album_id={album_id} />
          </div>
        </div>
      </div>

      <div className="memories-gallery">
        <Masonry
          breakpointCols={{
            default: 4, // Number of columns by default
            1100: 3, // At screen width of 1100px, display 2 columns
            700: 2, // At screen width of 700px, display 1 column
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {groupContent.map((entry) => (
            <div key={entry.id} className="memory-div">
              {entry.photo && (
                <div>
                  <img
                    src={entry.photo}
                    alt={`Photo of ${entry.description}`}
                  />
                  {/* {entry.content && (
                    <p className="memory-image-content">{entry.content}</p>
                  )} */}
                </div>
              )}
              {!entry.photo && entry.description && (
                <p className="memory-text-content">{entry.description}</p>
              )}
            </div>
          ))}
        </Masonry>
      </div>
    </>
  );
}
