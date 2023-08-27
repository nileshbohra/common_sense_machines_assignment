import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { downloadImage, uploadImage } from "../controllers/gallery.controller";
import { useLocation } from "react-router-dom";
import { getAllImages } from "../controllers/gallery.controller";

export default function Gallery() {
  const location = useLocation();
  const navigate = useNavigate();
  const uid = location.pathname.split("/").pop();
  let files;

  const [images, setImages] = React.useState([]);

  const handleUpload = (e) => {
    files = e.target.files;
  };

  const handleDownload = (uid, image_id, image_name) => {
    const data = {
      uid: uid,
      image_id: image_id,
    };
    downloadImage(data, async (err, response) => {
      if (!!err) {
        alert(err.response.data.status);
      } else {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = image_name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!files) return alert("Please select a file");
    const data = new FormData();
    data.append("image", files[0]);
    data.append("uid", uid);

    uploadImage(data, (err, data) => {
      if (err) {
        alert(err.response.data.status);
      } else {
        alert("Image uploaded successfully");
      }
    });
  };

  const getImages = () => {
    getAllImages(uid, (err, data) => {
      if (err) {
        alert(err.response.data.status);
      } else {
        setImages(data.images);
      }
    });
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleSubscription = () => {
    navigate(`/subscription/${uid}`);
  };

  const formatImageName = (name) => {
    if (name.length > 30) {
      const ext = name.split(".").pop();
      return name.split(".")[0].slice(0, 30) + "..." + ext;
    } else {
      return name;
    }
  };

  return (
    <>
      <div className="container">
        <div className="flex justify-between bg-gray-100 w-full p-2">
          <h1 className="flex justify-center items-center gap-1 text-lg font-medium">
            <i className="material-icons">cloud_upload</i>
            Image Upload
          </h1>
          <button
            onClick={handleSubscription}
            className="btn bg-green-600 flex justify-center items-center gap-1"
          >
            Upgrade Plan
            <i className="material-icons">whatshot</i>
          </button>
        </div>
        <div className="flex justify-between items-center bg-gray-200 w-full p-2">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex justify-center w-full items-center"
          >
            <div className="form-group">
              <input
                type="file"
                onChange={(e) => handleUpload(e)}
                name="image"
                id="image"
                accept="image/*"
              />
            </div>
            <button type="submit" className="btn bg-blue-600">
              Upload
            </button>
          </form>
        </div>
        <div>
          <div className="flex justify-between items-center bg-gray-300 w-full px-2 py-4">
            <h1>Image Gallery</h1>
            <button
              onClick={getImages}
              className="btn bg-blue-600 flex justify-center items-center gap-1"
            >
              Refresh Gallery
              <i className="material-icons">refresh</i>
            </button>
          </div>
          <div className="grid grid-flow-row-dense grid-cols-4 gap-1 mt-2">
            {images.map((image) => (
              <div
                className="flex flex-col justify-center items-center border-2 border-gray-400"
                style={{ width: "100%", height: "200px", overflow: "hidden" }}
                key={image.url}
              >
                <img
                  style={{ height: "90%" }}
                  src={image.url}
                  alt={image.name}
                  key={image._id}
                />
                <div className="flex w-full justify-between items-center">
                  <p className="text-sm">{formatImageName(image.name)}</p>
                  <button
                    onClick={(e) => handleDownload(uid, image._id, image.name)}
                  >
                    <i className="material-icons">file_download</i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
