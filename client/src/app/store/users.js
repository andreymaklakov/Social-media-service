import { createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService, {
  getAccessToken,
  getUserId,
  setTokens
} from "../service/localStorage.service";
import userService from "../service/user.service";
// import randomInt from "../utils/randomInt";
import history from "../utils/history";
import generateAuthError from "../utils/generateAuthError";

const initialState = getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested(state) {
      state.isLoading = true;
    },
    usersRecieved(state, action) {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess(state, action) {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed(state, action) {
      state.error = action.payload;
    },
    userCreated(state, action) {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut(state) {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    updateRequested(state) {
      state.isLoading = true;
    },
    updateRequestedSuccess(state, action) {
      state.entities = state.entities.map((user) => {
        if (user._id === localStorageService.getUserId()) {
          return action.payload;
        }
        return user;
      });
      state.isLoading = false;
    },
    updateRequestedFailed(state) {
      state.isLoading = false;
    },
    authRequested(state) {
      state.error = null;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersRecieved,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  // userCreated,
  userLoggedOut,
  updateRequested,
  updateRequestedSuccess,
  updateRequestedFailed,
  authRequested
} = actions;

// const userCreateRequested = createAction("users/userCreateRequested");
// const createUserFailed = createAction("users/createUserFailed");

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();

  dispatch(userLoggedOut());

  history.push("/");
};

export const updateUsersParams = (data) => async (dispatch) => {
  dispatch(updateRequested());

  try {
    const { content } = await userService.updateCurrentUser(data);

    dispatch(updateRequestedSuccess(content));

    history.replace(`/users/${content._id}`);
  } catch (error) {
    dispatch(updateRequestedFailed(error.message));
  }
};

export const logIn =
  ({ payload, redirect }) =>
  async (dispatch) => {
    dispatch(authRequested());

    const { email, password } = payload;

    try {
      const data = await authService.login({ email, password });

      setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      history.push(redirect);
    } catch (error) {
      const { message, code } = error.response.data.error;

      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());

  try {
    const data = await authService.register(payload);

    setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));

    history.push("/users");
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

// function createUser(payload) {
//   return async function (dispatch) {
//     dispatch(userCreateRequested());

//     try {
//       const { content } = await userService.create(payload);

//       dispatch(userCreated(content));
//       history.push("/users");
//     } catch (error) {
//       dispatch(createUserFailed(error.message));
//     }
//   };
// }

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());

  try {
    const { content } = await userService.get();

    dispatch(usersRecieved(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getUsers = () => (state) => state.users.entities;
export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((user) => user._id === userId);
  }
};
export const getCurrentUser = () => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((user) => user._id === getUserId());
  }
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
