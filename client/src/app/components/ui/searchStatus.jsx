import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const peopleWordRender = () => {
    const userLength = String(length).split("");

    if (
      ["2", "3", "4"].indexOf(userLength[Array.length - 1]) >= 0 &&
      userLength[Array.length - 2] !== "1"
    ) {
      return "человека";
    } else {
      return "человек";
    }
  };

  return length === 0 ? (
    <span className="badge bg-danger">Никто с тобой не тусанет</span>
  ) : (
    <span className={"badge bg-primary"}>
      {length} {peopleWordRender()} {length === 1 ? "тусанет" : "тусанут"} с
      тобой сегодня
    </span>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};

export default SearchStatus;
