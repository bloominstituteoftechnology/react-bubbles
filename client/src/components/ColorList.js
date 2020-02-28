import React, { useState } from "react";
import { axiosWithAuth } from "./AxiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const addColor = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("http://localhost:5000/api/colors/", colorToAdd)
      .then(res => {
        updateColors([...colors, colorToAdd]);
      })
      .catch(err => console.log(err));
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        axiosWithAuth()
          .get(`http://localhost:5000/api/colors`)
          .then(res => updateColors(res.data))
          .catch(err => console.log(err));
        setEditing(false);
      })
      .catch(err => {
        console.log("Error", err);
      });
  };
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(() => {
        axiosWithAuth()
          .get("http://localhost:5000/api/colors")
          .then(res => updateColors(res.data))
          .catch(err => console.log(err));
        setEditing(false);
      })
      .catch(err => {
        console.log("error", err);
      });
  };
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              <span onClick={() => editColor(color)}>{color.color}</span>
            </span>
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
      <div>
        <h3>Add a color</h3>
        <form>
          <label htmlFor="color-name">
            name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label htmlFor="hex-code">
            hex code:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, code: { hex: e.target.value } })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div>
            <button onClick={addColor}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
