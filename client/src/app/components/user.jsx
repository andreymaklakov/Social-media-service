import React from "react";
import Qualitie from "./ui/qualities/qualitie";
import BookMark from "./common/bookmark";
import PropTypes from "prop-types";

const User = ({
  name,
  _id,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Qualitie key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <button
          className="btn p-0"
          style={{ boxShadow: "none" }}
          onClick={() => onToggleBookMark(_id)}
        >
          <BookMark status={bookmark} />
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            onDelete(_id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};

export default User;
