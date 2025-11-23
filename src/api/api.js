import axios from "axios";

const API = axios.create({
  baseURL: "https://medicare-backend-2qu5.onrender.com",
});

export default API;