import React, { Component } from "react";

class Like extends Component {
  render() {
    let heartClass = "fa fa-heart";
    if (!this.props.liked) {
      heartClass += "-o";
    }
    return (
      <i
        style={{ cursor: "pointer" }}
        className={heartClass}
        aria-hidden="true"
        onClick={this.props.onLike}
      ></i>
    );
  }
}

export default Like;
