import axios from 'axios';

// Replace with your backend URL
const BASE_URL = 'http://192.168.29.58:8080/api/mobile';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHomeData = async (userId) => {
  try {
    const response = await api.get(`/home/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};

export const getProfileData = async (userId) => {
  try {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
};

export const updateProgress = async (data) => {
  try {
    const response = await api.post('/activity/progress', data);
    return response.data;
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
};

export default api;
