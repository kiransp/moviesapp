import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  render() {
    const { movies, onLike, sortColumn, onDelete, onSort } = this.props;
    console.log("Props at tbale ", this.props);
    const columns = [
      {
        label: "Title",
        path: "title",
        content: (movie) => (
          <Link to={"/movies/" + movie._id}>{movie.title}</Link>
        ),
      },
      { label: "Genre", path: "genre.name" },
      { label: "NumberInStock", path: "numberInStock" },
      { label: "DailyRentalRate", path: "dailyRentalRate" },
      {
        key: "like",
        content: (movie) => (
          <Like liked={movie.liked} onLike={() => onLike(movie)} />
        ),
      },
      {
        key: "delete",
        content: (movie) => (
          <button
            onClick={() => onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        ),
      },
    ];
    return (
      <Table
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
        columns={columns}
      />
    );
  }
}

export default MoviesTable;
