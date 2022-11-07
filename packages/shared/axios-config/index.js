const axios = require("axios");

const api = axios.create({
  baseURL: "https://nlw-copa.herokuapp.com",
});

module.exports = {
  api,
  axios,
};
