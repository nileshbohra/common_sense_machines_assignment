import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;

export const getAllPlans = async (uid, callback) => {
    try {
        const res = await axios.get(`${API_URL}/subscription/${uid}`);
        callback(null, res.data);
    } catch (err) {
        callback(err, 'Error getting plans');
    }
}

export const upgradePlan = async (data, callback) => {
    try {
        const { uid } = data;
        const res = await axios.post(`${API_URL}/subscription/${uid}/upgrade`, data);
        callback(null, res.data);
    } catch (err) {
        callback(err, 'Error upgrading plan');
    }
}