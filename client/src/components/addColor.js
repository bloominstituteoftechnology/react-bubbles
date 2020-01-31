import React from "react";
import {useForm} from "react-hook-form";
import axiosWithAuth from "../auth/axiosWithAuth.js";

import styled from 'styled-components'

const Formon  = styled.form`
justify-self: center;
margin-left: 10px
`



const AddColor = () => {
  const { register, handleSubmit} = useForm();

  const onSubmit = (data, e) => {
    const newColor = {
      code: {
        hex: data.hex
      },
      color: data.color
    };

    e.target.reset();
    axiosWithAuth()
      .post("/colors", newColor)
      .then((res) => 
      console.log(res))
      .catch((err) => 
      console.log(err));
  };

  return (
    <>
      <Formon onSubmit={handleSubmit(onSubmit)}>
        <legend>add color</legend>
        <label>
          color name:
          <input type="text" name="color" ref={register} />
        </label>
        <br />

        <label>
          hex code:
          <input type="text" name="hex" ref={register} />
        </label>
        <br />

        <input type="submit" value="add" />
      </Formon>
    </>
  );
};

export default AddColor;