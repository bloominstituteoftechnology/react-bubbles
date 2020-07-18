import React, { useState } from 'react';
import { axiosWithAuth } from '../axiosWithAuth';

const AddColors = () => {
  const [formState, setFormState] = useState({
    code: '',
    color: '',
  });

  const handleChange = e => {
    e.preventDefault();
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
      .post(`colors`, formState)
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
            value={formState.code}
            onChange={handleChange}
          />
        </label>
        <button>Add Color</button>
      </form>
    </>
  );
};

export default AddColors;
