import config from "../config.json";
import http from "./httpService";
import jwtDecode from "jwt-decode";

export async function login(email, password) {
  const result = await http.post(config.authEndPoint, {
    email,
    password,
  });
  localStorage.setItem("token", result.data);
}
export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}
export function getUserInfo() {
  try {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    console.log("Decoded user data ", user);
    return user;
  } catch (error) {
    return null;
  }
}
export function logout() {
  localStorage.removeItem("token");
}
export function getJwt() {
  return localStorage.getItem("token");
}
export default {
  login,
  loginWithJwt,
  logout,
  getUserInfo,
  getJwt,
};
