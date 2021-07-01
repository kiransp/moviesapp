import config from "../config.json";
import http from "./httpService";

export function getMovies() {
  return http.get(config.moviesEndPoint);
}

export function deleteMovie(movieId) {
  return http.delete(config.moviesEndPoint + "/" + movieId);
}
export function getMovie(movieId) {
  return http.get(config.moviesEndPoint + "/" + movieId);
}
export function saveMovie(movie) {
  console.log("data inside save ", movie);
  if (movie._id) {
    //do the update
    const body = { ...movie };
    delete body["_id"];
    return http.put(config.moviesEndPoint + "/" + movie._id, body);
  }
  return http.post(config.moviesEndPoint, movie);
}
