import React from "react";
import { useForm } from "react-hook-form";
import axiosWithAuth from "../auth/axiosWithAuth";

//Adds new color

const AddColor = ()=>{
    const {register, handleSubmit, reset} = useForm();

    const onSubmit =(data,e)=>{
        const newColor ={
            code:{
                hex:data.hex
            },
            color:data.color
        };

        e.target.reset();
        axiosWithAuth()
            .post("/colors", newColor)
            .then((res)=> console.log(res))
            .catch((err)=> console.log("Error: ",err));
        
    };
    return (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <legend>Add Color</legend>
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
          <div className = "button-row">
            <button type="submit" value="add">Add New Color</button>
            <button type="button" value ="happy">Happy Button</button>
          </div>
            
          </form>
        </>
    );

}


export default AddColor;