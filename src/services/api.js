import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const fetchUsers = () => API.get('/auth/users'); 
export const createUser = (userData) => API.post('/auth/register', userData); 
export const loginUser = (email) => API.post('/auth/login', { email }); 

export const fetchKudos = () => API.get('/kudos');
export const giveKudos = (kudosData) => API.post('/kudos', kudosData); 
export const fetchKudosOptions = () => API.get('/kudos/types'); 


export const fetchAnalytics = () => API.get('/analytics'); 

export default API;
