import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/moviesService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import SearchBox from "./searchBox";
import Filter from "./common/filter";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    activePage: 1,
    moviesPerPage: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { columnName: "title", order: "asc" }, // initial values.
  };
  async componentDidMount() {
    const result = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...result.data];
    const moviesResult = await getMovies();
    console.log("MOVI from rest ", moviesResult);
    this.setState({ genres, movies: moviesResult.data });
  }
  handleDelete = async (movie) => {
    //const movies = this.state.movies.filter((m) => m._id !== movie._id);
    let movies = [...this.state.movies]; //always good to have a copy
    const originalMovies = [...this.state.movies];
    movies = movies.filter((m) => m._id !== movie._id);
    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("this movie is already deleted");
      }
      console.log("Logging the error ", error);
      this.setState({ movies: originalMovies });
    }

    // this.setState({ movies: movies }); // this is also correct

    this.setState({ movies, activePage: 1 }); // when both the keys are of same name we can write as this.
  };
  handleLike = (movie) => {
    console.log("Inside handl like ", this.state);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };
  handlePageClick = (page) => {
    this.setState({ activePage: page });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, activePage: 1 });
  };
  handleFilterClick = (genre) => {
    this.setState({ selectedGenre: genre.name, activePage: 1 });
  };
  handleSelectedGenre = (genre) => {
    console.log("genre selected ", genre);
    this.setState({ selectedGenre: genre, activePage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      moviesPerPage,
      activePage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state; //object destructuring
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    // const filteredMovies =
    //   selectedGenre && selectedGenre._id
    //     ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
    //     : allMovies;

    const sortedMovies = _.orderBy(
      filtered,
      [sortColumn.columnName],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, moviesPerPage, activePage);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    //const moviesCnt = this.state.movies.length; // this is also correct.
    const { length: moviesCnt } = this.state.movies; // this is also correct. this object destructuring.
const {user}=this.props
    if (moviesCnt === 0) {
      return <h2 style={{ padding: "20px" }}>There are no movies in DB</h2>;
    }
    const { moviesPerPage, activePage, sortColumn, searchQuery } = this.state; //object destructuring
    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col col-2">
            <Filter
              allGenres={this.state.genres}
              onSelectingGenre={this.handleSelectedGenre}
              selectedGenre={this.state.selectedGenre}
            />
          </div>
          <div className="col">
            <h2>There are {totalCount} movies in DB</h2>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
        {user &&      <Link
              to="movies/new"
              className="btn btn-primary"
              style={{ marginBottom: "20px" }}
            >
              New Movie
            </Link>}
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              itemsPerPage={moviesPerPage}
              totalItemsCount={totalCount}
              activePage={activePage}
              handlePageClick={this.handlePageClick}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
