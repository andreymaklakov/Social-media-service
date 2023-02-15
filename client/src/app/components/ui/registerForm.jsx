import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
// import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    name: "",
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState({});

  const qualities = useSelector(getQualities());
  const professions = useSelector(getProfessions());

  const dispatch = useDispatch();

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  // const validateScheme = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required("Password is required")
  //     .matches(/(?=.*[A-Z])/, "Password must contain capital letter")
  //     .matches(/(?=.*[0-9])/, "Password must contain number")
  //     .matches(
  //       /(?=.*[!@#$%^&*])/,
  //       "Password must contain one of specials symbols !@#$%^&*"
  //     )
  //     .matches(/(?=.{8,})/, "Password must contain at least 8 symbols"),
  //   email: yup.string().required("Email is required").email("This is not Email")
  // });

  const validatorConfig = {
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "This is not Email" }
    },
    name: {
      isRequired: { message: "Name is required" },
      min: { message: "Name must contain at least 3 symbols", value: 3 }
    },
    password: {
      isRequired: { message: "Password is required" },
      isCapitalSymbol: { message: "Password must contain capital letter" },
      isContainDigit: { message: "Password must contain number" },
      min: { message: "Password must contain at least 8 symbols", value: 8 }
    },
    profession: {
      isRequired: { message: "Please select your profession." }
    },
    license: {
      isRequired: { message: "Please confirm license agreement." }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);

    // validateScheme
    //   .validate(data)
    //   .then(() => setErrors({}))
    //   .catch((err) => setErrors({ [err.path]: err.message }));

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  // const getProfessionById = (id) => {
  //   for (const prof of professions) {
  //     if (prof.value === id) {
  //       return { _id: prof.value, name: prof.label };
  //     }
  //   }
  // };

  // const getQualities = (elements) => {
  //   const qualitiesArray = [];
  //   for (const elem of elements) {
  //     for (const quality in qualities) {
  //       if (elem.value === qualities[quality].value) {
  //         qualitiesArray.push({
  //           _id: qualities[quality].value,
  //           name: qualities[quality].label,
  //           color: qualities[quality].color
  //         });
  //       }
  //     }
  //   }
  //   return qualitiesArray;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };

    dispatch(signUp(newData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        type="name"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />

      <TextField
        label="Email"
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />

      <SelectField
        label="Profession"
        value={data.profession}
        name="profession"
        onChange={handleChange}
        defaultOption="Choose..."
        options={professions}
        error={errors.profession}
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
        defaulValue={data.qualities}
        name="qualities"
        label="Choose your qualities"
      />

      <CheckBoxField
        value={data.license}
        name="license"
        onChange={handleChange}
        error={errors.license}
      >
        Confirm <a>license agreement</a>.
      </CheckBoxField>

      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
