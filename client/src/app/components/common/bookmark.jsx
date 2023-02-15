import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status }) => {
  return (
    <i
      className={"bi bi-bookmark-star" + (status ? "-fill" : "")}
      style={{ fontSize: "30px" }}
    ></i>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool
};

export default BookMark;
