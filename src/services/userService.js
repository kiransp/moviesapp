import config from "../config.json";
import http from "./httpService";

export function registerUser(user) {
  return http.post(config.userEndPoint, {
    name: user.name,
    email: user.username,
    password: user.password,
  });
}
