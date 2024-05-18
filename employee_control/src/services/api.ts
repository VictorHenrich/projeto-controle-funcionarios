import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default axios.create({
    baseURL: "http://localhost:5000/api"
})