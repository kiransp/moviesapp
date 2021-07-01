import axios from "axios";
import auth from "./authService";
axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
axios.interceptors.response.use(null, (error) => {
  //this will handle all unexpected error.
  // you might still need try catch block in axios methods to handle expected error and do something
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error ", error);
    alert("Something went wrong");
    return Promise.reject(error);
  }
  return Promise.reject(error);
});
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
