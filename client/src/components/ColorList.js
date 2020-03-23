import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import { axiosWithAuth } from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  // console.log();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e, id) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data);
        setColorToEdit(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteColor = (e, id) => {
    // make a delete request to delete this color

    axiosWithAuth()
      .delete(`/api/colors/${colorToEdit.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  };

  return (
    <Router>
      <div className="colors-wrap">
        <p>colors</p>
        <ul>
          {colors.map(color => (
            <li key={color.color} onClick={() => editColor(color)}>
              <span>
                <span
                  className="delete"
                  onClick={e => {
                    e.stopPropagation();
                    deleteColor(color);
                  }}
                >
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
    </Router>
  );
};

export default ColorList;
