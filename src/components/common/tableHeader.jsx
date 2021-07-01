import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (pathToColumnName) => {
    console.log("pathToColumnName ", this.props.sortColumn);
    const sortColumn = { ...this.props.sortColumn };
    if (pathToColumnName === sortColumn.columnName) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.columnName = pathToColumnName;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  renderSortIcon = (column) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.columnName === column.path) {
      if (sortColumn.order === "asc") {
        return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
      } else return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
    }
    // can also write as below
    // if (sortColumn.columnName !== column.path) return null;
    // if (sortColumn.order === "asc") {
    //   return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    // } else return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
