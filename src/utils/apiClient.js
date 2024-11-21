
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://unlockpi.vercel.app/api/mobile',  // Use the root URL, not the specific endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
