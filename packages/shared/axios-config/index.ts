import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://nlw-copa.herokuapp.com"
      : "http://192.168.0.12:3333",
});

export { api, axios };
