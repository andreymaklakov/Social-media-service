import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import PropTypes from "prop-types";
import MultiSelectField from "../common/form/multiSelectField";
import { useSelector, useDispatch } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../store/professions";
import { getCurrentUser, updateUsersParams } from "../../store/users";
import { useHistory } from "react-router-dom";

const UserChangeForm = ({ id }) => {
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(getCurrentUser());
  const qualities = useSelector(getQualities());
  const qualityLoading = useSelector(getQualitiesLoadingStatus());
  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsLoadingStatus());

  useEffect(() => {
    currentUser &&
      !professionLoading &&
      !qualityLoading &&
      !data &&
      setData({
        ...currentUser,
        qualities: currentUser.qualities.map((qualityId) => {
          const quality = qualities.filter((qual) => qual._id === qualityId);
          return (
            quality && {
              label: quality[0].name,
              value: quality[0]._id,
              color: quality[0].color
            }
          );
        })
      });
  }, [currentUser, professionLoading, qualityLoading, data]);

  useEffect(() => {
    isLoading && data && setIsLoading(false);
  }, [data]);

  const handleUser = () => {
    history.replace(`/users/${id}`);
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "This is not Email" }
    },
    name: { isRequired: { message: "Name is required" } }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const getUserQualities = (elements) => {
    const qualitiesArr = [];
    for (const elem of elements) {
      qualitiesArr.push(elem.value);
    }
    return qualitiesArr;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    dispatch(
      updateUsersParams({
        ...data,
        qualities: getUserQualities(data.qualities)
      })
    );
  };

  return (
    <div className="container mt-5">
      <button onClick={handleUser} className="btn btn-primary mx-auto">
        Back
      </button>

      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                type="text"
                value={data.name}
                onChange={handleChange}
              />

              <TextField
                label="Email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />

              <SelectField
                label="Profession"
                value={data.profession}
                name="profession"
                onChange={handleChange}
                defaultOption="Choose..."
                options={professions}
              />

              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                name="sex"
                onChange={handleChange}
                value={data.sex}
                label="Select your sex"
              />

              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Choose your qualities"
              />

              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Change
              </button>
            </form>
          ) : (
            "loading..."
          )}
        </div>
      </div>
    </div>
  );
};

UserChangeForm.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserChangeForm;
