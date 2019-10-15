import React, { useState } from "react";
// step 1 import your token authorization page
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    console.log(colorToEdit);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      // think about where will you get the id from...
      // where is is saved right now?
      .then(response => {
      //   updateColors(
      //             colors.map(color => (color.id !== colorToEdit.id ? color:
      //             response.data))
      // );
      //           setEditing(false);
      //         })
      //         .catch(error => {
      //           console.log(error);
      //           setEditing(false);
      //     });
      //   };
      
        updateColors([
          ...colors.filter(color => color.id !== colorToEdit.id),
          response.data,
        ])
        setEditing(false);
      })
      .catch(error => console.log(error));
  };

  const deleteColor = colorToDelete => {
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`)
      // why do we not/need "color" after color.id?
      .then(() => {
updateColors(colors.filter(color => color.id !== colorToDelete.id));
      })
      .catch(error => console.log(error)); 
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
