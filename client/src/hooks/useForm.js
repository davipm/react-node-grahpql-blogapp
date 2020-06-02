import { useState } from "react";

function UseForm(callback, initialState = {}) {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    values,
    onChange,
    onSubmit,
  };
}

export default UseForm;
