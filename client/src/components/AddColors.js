import React, { useState } from 'react';
import { axiosWithAuth } from '../axiosWithAuth';

const AddColors = props => {
  const { updateColors } = props;
  const [formState, setFormState] = useState({
    code: {
      hex: '',
    },
    color: '',
  });

  const handleChange = e => {
    e.preventDefault();
    const code = { hex: e.target.value };
    [e.target.name] === 'code'
      ? setFormState({
          code,
          ...formState,
        })
      : setFormState({
          ...formState,
          [e.target.name]: e.target.value,
        });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
      .post(`colors`, formState)
      .then(res => updateColors(res.data))
      .catch(err => console.log(err));

    setFormState({
      code: {
        hex: '',
      },
      color: '',
    });
  };

  return (
    <>
      <h2>Add Colors</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Color Name
          <input
            type="text"
            name="color"
            value={formState.color}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="hex">
          Hex Code
          <input
            type="text"
            name="code"
            value={formState.code.hex}
            onChange={handleChange}
          />
        </label>
        <button>Add Color</button>
      </form>
    </>
  );
};

export default AddColors;
