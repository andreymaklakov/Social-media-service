import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ quality }) => {
  const { color, name } = quality;

  return <span className={"badge m-1 bg-" + color}>{name}</span>;
};

Qualitie.propTypes = {
  quality: PropTypes.object.isRequired
};

export default Qualitie;
