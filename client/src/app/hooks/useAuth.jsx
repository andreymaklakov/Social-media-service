import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../service/user.service";
import { toast } from "react-toastify";
import localStorageService, {
  setTokens
} from "../service/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: { key: process.env.REACT_APP_FIREBASE_KEY }
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  function logout() {
    localStorageService.removeAuthData();
    setCurrentUser("");
    history.push("/");
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      });

      setTokens(data);
      await createUser({
        _id: data.localId,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        email,
        ...rest
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = { email: "User with this email already exists" };
          throw errorObject;
        }
        if (message === "INVALID_EMAIL") {
          const errorObject = { email: "This is not Email" };
          throw errorObject;
        }
      }
    }
  }

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      });

      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND" || message === "INVALID_PASSWORD") {
          throw new Error("Email or password is incorrect");
        }
        if (message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
          throw new Error("Too many enter attempts try later");
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);

      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function updateUsersParams(data) {
    const { completedMeetings, rate, _id, image, license } = currentUser;
    const fullData = {
      ...data,
      rate,
      completedMeetings,
      _id,
      image,
      license
    };

    try {
      const { content } = await userService.updateCurrentUser(fullData);

      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <AuthContext.Provider
      value={{ signUp, logIn, logout, updateUsersParams, currentUser }}
    >
      {!isLoading ? children : "loading..."}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
