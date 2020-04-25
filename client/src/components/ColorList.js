import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {useHistory } from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const newInitialColor = {
  color: '',
  code: {hex: ''}
}

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(newInitialColor);
  const {push} = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      //need to push this back somehow
      console.log(res, "FROM THE PUTTTTTT")
       //document.location.reload(true)
      // push('/bubble-page')
    }).catch(err =>{
      console.log(err, 'this is the put error danggit!')
    })
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`/colors/${color.id}`)
    .then(res =>
      console.log('successfully deleted', res)
    //,document.location.reload(true)
    ).catch(err => console.log('sorry this color did not delete', err))
  };

  const addNewColor = color => {
    color.preventDefault();
    axiosWithAuth().put(`colors/${newColor.nextId}`)
    .then(res =>{
      
      console.log('adding new color:', res)
    }).catch(err => {console.log(err, 'ERROR FOR ADD COLOR')})
    
  }


  const colorSubmit = e =>{
    e.preventDefault();
    setNewColor(setNewColor({
      ...newColor,
      code: [colors.hex, '']
    }))
  }
  
  
  

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}
      <form className="colorAdder" onSubmit={colorSubmit}>
        <lengend>Add New Color</lengend>
            <input 
            type ="text"
            name ='color'
            placeholder = "Enter New Color"
            // onChange = {}
            />
            <input 
            type ='text'
            name ='hex'
            placeholder = 'Enter Hex'
            
            />


            <button onClick={addNewColor}> Add New Color!</button>
      </form>
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;