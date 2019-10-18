import React, { useState } from "react";
// import axios from "axios";

import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log('colorList color prop', colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(!editing);
    setColorToEdit(color);
    console.log(`colorToEdit`, colorToEdit)
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data)
        let newList = colors.filter(entry => entry.id !== colorToEdit.id)
        updateColors([...newList, res.data])
        // })
      })
      .catch(err => console.log(err.response));
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    setEditing(false)
  };

  const deleteColor = (e, color) => {
    e.stopPropagation()
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(`aWA.delete res`, res)
        const newList = colors.filter(entry => entry.id !== color.id)
        updateColors(newList)
      })
    // make a delete request to delete this color
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => deleteColor(e, color)}>
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
