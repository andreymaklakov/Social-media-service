import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UsersTable = ({ users, onToggleBookMark, ...rest }) => {
  const bookmarkBtn = (id, bookmark) => {
    return (
      <button
        className="btn p-0"
        style={{ boxShadow: "none" }}
        onClick={() => onToggleBookMark(id)}
      >
        <BookMark status={bookmark} />
      </button>
    );
  };

  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    profession: {
      name: "Профессия",
      component: (user) => <Profession id={user.profession} />
    },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => bookmarkBtn(user._id, user.bookmark)
    }
  };

  return <Table {...{ columns, data: users, ...rest }} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};

export default UsersTable;
