import React, { useEffect, useState } from "react";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createComment } from "../../../store/comments";

const NewComment = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const { userId } = useParams();
  const dispatch = useDispatch();

  const validatorConfig = {
    content: { isRequired: { message: "Comment is required" } }
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

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    dispatch(createComment(data, userId));

    setData({});
  };

  return (
    <>
      <h2>New Comment</h2>

      <form onSubmit={handleSubmit}>
        <TextAreaField
          value={data.content || ""}
          name="content"
          onChange={handleChange}
        />

        <div className="d-flex justify-content-end">
          <button type="submit" disabled={!isValid} className="btn btn-primary">
            Post comment
          </button>
        </div>
      </form>
    </>
  );
};

export default NewComment;
