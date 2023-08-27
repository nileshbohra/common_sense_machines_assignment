import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;

export const signup = async (user, callback) => {
    await axios.post(`${API_URL}/auth/signup`, user).then((res) => {
        if (!!res.data.token) {
            localStorage.setItem('isAuthenticated', true);
        }
        callback(null, res.data);
    }).catch((err) => {
        callback(err, null);
    });
}

export const login = async (user, callback) => {
    await axios.post(`${API_URL}/auth/login`, user).then((res) => {
        if(!!res.data.token) {
            localStorage.setItem('isAuthenticated', true);
        }
        callback(null, res.data);
    }).catch((err) => {
        callback(err, null);
    });
}

export const logout = async (callback) => {
    await axios.get(`${API_URL}/auth/logout`).then((res) => {
        localStorage.removeItem('isAuthenticated');
        callback(null, res.data);
    }).catch((err) => {
        callback(err, null);
    });
}
