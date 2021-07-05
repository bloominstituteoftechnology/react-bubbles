import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from "../Utils/Auth"
import { useParams } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({colors, updateColors }) => {
  
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
console.log(colorToEdit ,'colorToEdit')
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, editColor)
    .then(res => {
      console.log("we got the color, lets change it!",  res);
      updateColors(colors.map(color => (color.id === colorToEdit.id ? res.data : color))
       )
       setEditing(false)     
      
    })
   
    .catch(err => {
      console.log("Err");
    });
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    axios
    .delete(`http://localhost:5000/api/colors`)
    .then(res => {
      console.log("DELETED!", res);
      this.props.history.push("/");
    })
    .catch(err => {
      console.log("Delete Spell Missed!", err);
    });

    // make a delete request to delete this color
  };

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
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
