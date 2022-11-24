import axios from 'axios';

//ADMIN ACTIONS
export const userGetMethod = (url) => {
    const userToken = sessionStorage.getItem('userToken');
    let mainResponse = [];
    mainResponse = axios.get(`${process.env.REACT_APP_BASEURL}/${url}`, { headers: { Authorization: `Bearer ${userToken}` } })
    return mainResponse;
}

export const userPostMethod = (url, data) => {
    const userToken = sessionStorage.getItem('userToken');
    let mainResponse = [];
    mainResponse = axios.post(`${process.env.REACT_APP_BASEURL}/${url}`, data, { headers: { Authorization: `Bearer ${userToken}` } })
    return mainResponse;
}

export const userPutMethod = (url, data) => {
    const userToken = sessionStorage.getItem('userToken');
    let mainResponse = [];
    mainResponse = axios.put(`${process.env.REACT_APP_BASEURL}/${url}`, data, { headers: { Authorization: `Bearer ${userToken}` } })
    return mainResponse;
}

export const userDeleteMethod = (url, paramId) => {
    const userToken = sessionStorage.getItem('userToken');
    let getMainResponse = [];
    getMainResponse = axios.delete(`${process.env.REACT_APP_BASEURL}/${url}/${paramId}`, { headers: { Authorization: `Bearer ${userToken}` } })
    return getMainResponse;
}

export const globalGetMethod = (url) => {
    let mainResponse = [];
    mainResponse = axios.get(`${process.env.REACT_APP_BASEURL}/${url}`)
    return mainResponse;
}

//GENERAL ACTIONS
export const getMethod = (url) => {
    const token = sessionStorage.getItem('token');
    let getMainResponse = [];
    getMainResponse = axios.get(`${process.env.REACT_APP_BASEURL}/${url}`, { headers: { Authorization: `Bearer ${token}` } })
    return getMainResponse;
}

export const postMethod = (url, data) => {
    const token = sessionStorage.getItem('token');
    let getMainResponse = [];
    getMainResponse = axios.post(`${process.env.REACT_APP_BASEURL}/${url}`, data, { headers: { Authorization: `Bearer ${token}` } })
    return getMainResponse;
}

export const putMethod = (url, data) => {
    const token = sessionStorage.getItem('token');
    let mainResponse = [];
    mainResponse = axios.put(`${process.env.REACT_APP_BASEURL}/${url}`, data, { headers: { Authorization: `Bearer ${token}` } })
    return mainResponse;
}

export const deleteMethod = (url, paramId) => {
    const token = sessionStorage.getItem('token');
    let getMainResponse = [];
    getMainResponse = axios.delete(`${process.env.REACT_APP_BASEURL}/${url}/${paramId}`, { headers: { Authorization: `Bearer ${token}` } })
    return getMainResponse;
}