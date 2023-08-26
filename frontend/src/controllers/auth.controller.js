import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const signup = async (user, callback) => {
    await axios.post(`${API_URL}/auth/signup`, user).then((res) => {
        callback(null, res.data);
    }).catch((err) => {
        callback(err, null);
    });
}

export const login = async (user, callback) => {
    await axios.post(`${API_URL}/auth/login`, user).then((res) => {
        callback(null, res.data);
    }).catch((err) => {
        callback(err, null);
    });
}

export const getUsers = async () => {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
}