import React from "react";

import PropTypes from "prop-types";
import CommentsList from "../../ui/comments/commentsList";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import CompletedMeetingsCard from "../../ui/completedMeetingsCard";
import { getUserById } from "../../../store/users";
import { useSelector } from "react-redux";

const UserPage = ({ id }) => {
  const user = useSelector(getUserById(id));

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard user={user} />
            <CompletedMeetingsCard user={user} />
          </div>

          <div className="col-md-8">
            <CommentsList user={user} />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
