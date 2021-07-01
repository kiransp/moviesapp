import React from "react";
import PropTypes from "prop-types";

const Pagination = (props) => {
  console.log("Props n pagination ", props);
  const { totalItemsCount, itemsPerPage, activePage, handlePageClick } = props;
  const pagesCount = Math.ceil(totalItemsCount / itemsPerPage);
  // build an array from 1 to pagesCount .,
  let pages = [1];
  for (let i = 2; i <= pagesCount; i++) {
    pages.push(i);
  }
  console.log("total pages", pages);
  if (pages.length === 1) return null;
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={activePage === page ? "page-item active" : "page-item"}
          >
            <a
              href="#top"
              className="page-link"
              onClick={() => handlePageClick(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
// look for casing of propTypes ., p should be small
Pagination.propTypes = {
  totalItemsCount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};
export default Pagination;
