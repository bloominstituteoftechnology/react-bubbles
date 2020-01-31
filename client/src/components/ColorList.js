import React, { useState, useEffect } from "react";

// Modules
import { axiosWithAuth } from "../modules/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState({
    color: '',
    code: {
      hex: '',
    }
  });

  useEffect(() => {
    updateColors(colors)
  }, [colors]);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(colors.map(color => {
          return color.id === res.data.id ? res.data : color
        }));
      })
      .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id !== res.data));
      })
      .catch(err => console.log(err.response));
  };

  const addColor = (e, color) => {
    e.preventDefault();
    setColorToAdd({
      color: '',
      code: {
        hex: '',
      }
    });
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors`, color)
        .then(res => {
          updateColors(res.data);
        })
        .catch(err => console.log(err.response));
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

      <form
        onSubmit={(e) => addColor(e, colorToAdd)}
        className="addcolor-form"
      >
        <legend>add color</legend>
        <label>
          color name:
            <input
              placeholder="Name of color..."
              onChange={e => setColorToAdd({ ...colorToAdd, color: e.target.value })}
              value={colorToAdd.color}
            />
        </label>
        <label>
          hex code:
            <input
              placeholder="Hex value..."
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
        </label>
        <div className="button-row">
          <button type="submit">
            add
          </button>
          </div>
      </form>
    </div>
  );
};

export default ColorList;