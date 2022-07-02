import axios from "axios";

const Api = axios.create({
  baseURL: "http://ec2.youthindiaeschool.com/api/v1",
});

export const setToken = (token_) => {
  if (token_) {
    // console.log("Header set");
    Api.defaults.headers["Authorization"] = `Bearer ${token_}`;
  } else {
    const token = localStorage.getItem("token");
    if (token) {
      Api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }
};
export const removeToken = () => {
  const token = localStorage.getItem("token");
  delete Api.defaults.headers.common["Authorization"];
};

export default Api;
