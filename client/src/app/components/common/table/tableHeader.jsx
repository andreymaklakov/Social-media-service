import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ selectedSort, onSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => {
          return (
            <th
              key={column}
              {...{ role: columns[column].path && "button" }}
              onClick={
                columns[column].path
                  ? () => handleSort(columns[column].path)
                  : undefined
              }
              scope="col"
            >
              {columns[column].name}
              {columns[column].path &&
                selectedSort.path === columns[column].path && (
                  <i
                    className={
                      "bi bi-caret-" +
                      (selectedSort.order === "desc" ? "up-fill" : "down-fill")
                    }
                  ></i>
                )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
