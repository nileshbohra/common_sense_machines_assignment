import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const signup = async (user) => {
    const res = await axios.post(`${API_URL}/auth/signup`, user);
    return res.data;
}

export const login = async (user) => {
    const res = await axios.post(`${API_URL}/auth/login`, user);
    return res.data;
}

export const getUsers = async () => {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
}