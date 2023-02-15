import { useEffect } from "react";
import {
  getDataStatus,
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList
} from "../../../store/users";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionsList } from "../../../store/professions";

const AppLoader = ({ children }) => {
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersLoadingStatus = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadQualitiesList());
      dispatch(loadProfessionsList());

      if (isLoggedIn) {
        dispatch(loadUsersList());
      }
    }
  }, [isLoggedIn]);

  if (usersLoadingStatus) return "loading...";
  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
