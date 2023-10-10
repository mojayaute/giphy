import React, { useState } from "react";
import ModalComponent from "./Modal";

const GiphyList = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="row justify-content-center">
      {data.map((item, index) => (
        <div
          className="col-md-4 p-2"
          key={index}
          onClick={() => openModal(item.images.downsized.url)}
        >
          <img
            src={item.images.downsized.url}
            alt={item.title}
            height={220}
            width={220}
            style={{ cursor: "pointer" }}
          />
        </div>
      ))}
      <ModalComponent
        showModal={showModal}
        handleClose={closeModal}
        imageUrl={selectedImageUrl}
      />
    </div>
  );
};

export default GiphyList;
