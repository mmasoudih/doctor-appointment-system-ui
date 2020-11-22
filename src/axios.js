import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 20000
  // headers:{
  //   'Authorization': `Bearer ${Store.getters.token}`
  // }
});

api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
export default api;
