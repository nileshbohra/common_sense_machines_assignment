import React from "react";
import { uploadImage } from "../controllers/gallery.controller";
import { useLocation } from "react-router-dom";
import { getAllImages } from "../controllers/gallery.controller";

export default function Gallery() {
  const location = useLocation();
  const uid = location.pathname.split("/").pop();
  let files;

  const [images, setImages] = React.useState([]);

  const handleUpload = (e) => {
    files = e.target.files;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", files[0]);
    data.append("uid", uid);

    uploadImage(data, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  };

  const getImages = () => {
    getAllImages(uid, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        setImages(data.images);
      }
    });
  };

  return (
    <>
      <div>
        <h1>Image Upload</h1>
        <p>Upload your images here</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="file"
            onChange={(e) => handleUpload(e)}
            name="image"
            id="image"
            accept="image/*"
          />
          <input type="submit" value="Upload" />
        </form>
        <div>
          <h1>Image Gallery</h1>
          <p>View your images here</p>
          <button onClick={getImages}>View Gallery</button>
          <div style={{ width: "90vw", height: "50vw", display: "flex", gap: "10px", margin: "10px"}}>
            {images.map((image) => (
              <div style={{height: "200px", overflow: "hidden"}}>
                <img style={{width: "100%", height: "100%"}} src={image.url} alt={image.name} key={image._id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
