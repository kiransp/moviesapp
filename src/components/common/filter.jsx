import React from "react";

const Filter = (props) => {
  const { allGenres, selectedGenre, onSelectingGenre } = props;

  return (
    <ul className="list-group">
      {allGenres.map((genre) => (
        <li
          key={genre._id}
          className={
            selectedGenre === genre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onSelectingGenre(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default Filter;
