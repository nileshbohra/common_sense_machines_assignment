import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;

export const uploadImage = async (req, callback) => {
    const uid = req.get("uid");

    await axios.post(`${API_URL}/gallery/${uid}/upload`, req).then(res => {
        callback(null, res.data);
    }).catch(error => {
        callback(error, null);
    });
}

export const getAllImages = async (uid, callback) => {
    await axios.get(`${API_URL}/gallery/${uid}`).then(res => {
        callback(null, res.data);
    }).catch(error => {
        callback(error, null);
    });
}

export const downloadImage = async (data, callback) => {
    const { uid, image_id } = data;
    await axios.get(`${API_URL}/gallery/${uid}/download/${image_id}`, { responseType: 'blob' }).then(res => {
        callback(null, res);
    }).catch(error => {
        callback(error, null);
    });
}