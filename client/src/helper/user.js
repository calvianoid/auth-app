import axios from "axios";

export const auth = (url, data) => {
  return axios({
    url: url,
    method: "POST",
    data: data,
  });
};

export const getDetail = (url, data) => {
  return axios({
    url: url,
    method: "POST",
    data: {
      username: data.username,
    },
    headers: {
      token: data.token,
    },
  });
};
