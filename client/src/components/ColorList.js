import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, props }) => {
  console.log("Colors in Color list", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  const saveEdit = e => {
    // e.preventDefault();
    console.log("edit", colorToEdit);
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then (res => {
      console.log( " Response in the PUT request",res)
      updateColors(colors => colors.map((color) => {
        return color.id === colorToEdit.id ? {...colorToEdit} : color;
      }));
    })
    .catch(err => {
      console.log(err)
    })
  };

  // make a delete request to delete this color
  const deleteColor = color => {
    console.log("Color in delete", color.id)
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res => {
      console.log("Response in the DELETE request",res)
      updateColors(res.data.filter(item => {
        console.log("item",item)
        return (
          item.color !== color.id
        )
      }));
      props.history.push('/');
    })

    .catch (err => console.log (err))
    
  };
 

  return (
    <div className="colors-wrap">
     
      <p>Colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span 
               className="delete"
               onClick={e => {
                    e.preventDefault();
                    deleteColor(color)
                  }
                }>
                  x
              </span>
              {" "}
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
            <button type="submit">Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
