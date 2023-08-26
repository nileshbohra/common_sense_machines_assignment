import React from "react";
import { uploadImage } from "../controllers/gallery.controller";
import { useLocation } from "react-router-dom";

export default function Gallery() {
  const location = useLocation();
  const uid = location.pathname.split("/").pop();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      image: e.target.image.value,
      uid: uid,
    };
    uploadImage(data, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  };
  return (
    <>
      <div>
        <h1>Image Upload</h1>
        <p>Upload your images here</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="file" name="image" id="image" accept="image/*"/>
          <input type="submit" value="Upload" />
        </form>
      </div>
    </>
  );
}
