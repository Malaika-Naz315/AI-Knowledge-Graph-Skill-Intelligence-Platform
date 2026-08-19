import axios from "axios";

const API = axios.create({
    baseURL: "https://ai-knowledge-graph-skill-intelligence-platform-production-7698.up.railway.app",
});

export default API;