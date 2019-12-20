import React from "react";
// import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColor, removeColorById }) => {
  // console.log(props);
  const [editing, setEditing] = React.useState(false);
  const [colorToEdit, setColorToEdit] = React.useState(initialColor);

  console.log(colorToEdit);
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    // console.log("id", color.id);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res);
        updateColor(colorToEdit.id, res.data);
        setEditing(!editing);
      })
      .catch(err => console.log(err));
  };
  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        removeColorById(res.data);
      })
      .catch(err => console.log(err));
  };
  if (!colors) {
    return <h1>loading...</h1>;
  }
  return (
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
  );
};

export default ColorList;
