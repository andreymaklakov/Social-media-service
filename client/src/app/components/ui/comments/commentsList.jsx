import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import NewComment from "./newComment";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from "../../../store/comments";

const CommentsList = ({ user }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getCommentsLoadingStatus());

  useEffect(() => {
    dispatch(loadCommentsList(user._id));
  }, [user._id]);

  const comments = useSelector(getComments());

  if (isLoading) return "loading...";

  const commentsCopy = [...comments];

  const sortedComments = commentsCopy?.sort(
    (a, b) => b.created_at - a.created_at
  );

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };

  return (
    <>
      <div className="card mb-2">
        {""}
        <div className="card-body ">
          <NewComment />
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          {sortedComments &&
            sortedComments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onDelete={handleDeleteComment}
              />
            ))}
        </div>
      </div>
    </>
  );
};

CommentsList.propTypes = {
  user: PropTypes.object.isRequired
};

export default CommentsList;
