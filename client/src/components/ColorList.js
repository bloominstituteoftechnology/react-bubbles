import React, { useState } from "react";
import axios from "axios";

//axiosWithAuth
import axiosWithAuth from '../utils/axiosWithAuth.js'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log("I am colorList state from BubblePage", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    console.log("in saveEdit",colorToEdit)

  
    axiosWithAuth().put(`http://www.localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)

    .then(response => {
      // updateColors(
      //   colors.map(crayon => {
      //     console.log("in colors.map", crayon)
      //     if (crayon.id === colorToEdit.id) {
      //       console.log("in if stmt", colorToEdit.id)
      //       return response.data
      //     }
      //     else {
      //       return crayon
      //     }
      //   })

      // )
      // setEditing(false)
      // setColorToEdit(initialColor)
      console.log("in put response", colorToEdit.id)
      // updateColors(colorToEdit)

    })
    // console.log("I am in put req.", response.data)
   
    .catch(error => {console.log("error in put req", error)})
 
    window.location.reload()

  
  //end function here 
}






  const deleteColor = color => {
    axiosWithAuth().delete(`http://www.localhost:5000/api/colors/${color.id}`, colorToEdit)
   
    .catch(error => { console.log("err in del", error)})
    window.location.reload()
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
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
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
