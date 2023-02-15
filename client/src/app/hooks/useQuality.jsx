import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../service/quality.service";

const QualityContext = React.createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualities();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getQualities() {
    try {
      const { content } = await qualityService.get();

      setQualities(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function getQuality(id) {
    return qualities.find((qual) => qual._id === id);
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <QualityContext.Provider value={{ qualities, isLoading, getQuality }}>
      {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default QualityProvider;
