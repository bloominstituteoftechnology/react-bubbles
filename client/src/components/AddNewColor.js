import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialState = {
    color: "",
    code: { hex: "" }
 }
 const AddNewColor =props =>{
 const [newColor, setNewColor] = useState(initialState);

 const handleTextInput = e => {
    //e.persist();
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(initialState);
    let value =e.target.value 

    setNewColor({ ...initialState,  [e.target.name]: value});
  };

  const handleSubmit = e => {
  
    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(response => {
          console.log ("Response in the POST request Add Color", response)
          setNewColor(response.data)
          props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };
 
     return (
        <div className="add-color-wrapp">
          <form onSubmit={handleSubmit}>
            <legend>Add color</legend>
            <label>
              Color name:
              <input
                type='text'
                name='color'
                onChange={ e =>{ setNewColor({...newColor, color:e.target.value})}}
                value={newColor.color}
              />
            </label>
            <label>
              Hex code:
              <input
                name="code"
                onChange={e =>{ setNewColor ({...newColor, code:{hex: e.target.value}})}}
                value={newColor.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit"  >Save</button>
            </div>
        </form>
      </div>
     )

 }
 export default AddNewColor;