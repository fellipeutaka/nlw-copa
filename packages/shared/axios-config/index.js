const axios = require("axios");

const api = axios.create({
  baseURL: "https://nlw-copa.herokuapp.com",
});

export { api, axios };
