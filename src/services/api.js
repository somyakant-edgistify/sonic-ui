import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerationAPI = async (params={})=>{

    try {
        const response = await API.post('/inquiry',params);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}