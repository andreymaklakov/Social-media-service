import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ data, columns, children, ...rest }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ columns, ...rest }} />

          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  children: PropTypes.array
};

export default Table;
