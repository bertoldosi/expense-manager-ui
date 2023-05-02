import axios from "axios";

const instances = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {},
});

export default instances;
