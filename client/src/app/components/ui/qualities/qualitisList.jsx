import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useSelector, useDispatch } from "react-redux";
import {
  getQualitiesLoadingStatus,
  getQualitiesById,
  loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  const qualitiesList = useSelector(getQualitiesById(qualities));

  if (isLoading) return "loading...";

  return (
    <>
      {qualitiesList.map((quality) => (
        <Qualitie key={quality._id} quality={quality} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
