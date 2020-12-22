import axios from "axios";
const api = axios.create({
  baseURL: "http://mohamadmasoudi.ir/api",
  timeout: 40000
  // headers:{
  //   'Authorization': `Bearer ${Store.getters.token}`
  // }
});

api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
export default api;
