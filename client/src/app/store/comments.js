import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../service/comment.service";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested(state) {
      state.isLoading = true;
    },
    commentsRecieved(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreateSuccessed(state, action) {
      state.entities = [...state.entities, action.payload];
    },
    commentDeleteSuccessed(state, action) {
      state.entities = state.entities.filter(
        (comment) => comment._id !== action.payload
      );
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsRecieved,
  commentsRequestFailed,
  commentCreateSuccessed,
  commentDeleteSuccessed
} = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateFailed = createAction("comments/commentCreateFailed");
const commentDeleteRequested = createAction("comments/commentDeleteRequested");
const commentDeleteFailed = createAction("comments/commentDeleteFailed");

export const deleteComment = (id) => async (dispatch) => {
  dispatch(commentDeleteRequested());

  try {
    const { content } = await commentService.deleteComment(id);

    if (!content) {
      dispatch(commentDeleteSuccessed(id));
    }
  } catch (error) {
    dispatch(commentDeleteFailed(error.message));
  }
};

export const createComment = (data, userId) => async (dispatch, getState) => {
  const comment = {
    ...data,
    pageId: userId,
    created_at: Date.now(),
    userId: getCurrentUserId()(getState())
  };

  dispatch(commentCreateRequested());

  try {
    const { content } = await commentService.creareComment(comment);

    dispatch(commentCreateSuccessed(content));
  } catch (error) {
    dispatch(commentCreateFailed(error.message));
  }
};

export const loadCommentsList = (pageId) => async (dispatch) => {
  dispatch(commentsRequested());

  try {
    const { content } = await commentService.getComments(pageId);

    dispatch(commentsRecieved(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
