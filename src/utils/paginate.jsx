import _ from "lodash";

export function paginate(totalItems, itemsPerPage, currentPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return _(totalItems).slice(startIndex).take(itemsPerPage).value();
}
