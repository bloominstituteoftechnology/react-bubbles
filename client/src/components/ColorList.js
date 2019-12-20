import React, { useState } from "react";
import {NavLink} from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColorChangeHandler = e => {
    setNewColor({ ...newColor, color: e.target.value });
  };

  const addHexChangeHandler = e => {
    setNewColor({
      ...newColor,
      code: { hex: e.target.value }
    });
  };

  const addColor = color => {
    axiosWithAuth()
      .post('/colors', color)
      .then(res => console.log('You added a color!', newColor))
      .catch(err => console.log(err));
  }

  const saveEdit = e => {
    e.preventDefault();
    const body = { ...colorToEdit };
    const { id } = colorToEdit;
    axiosWithAuth()
      .put(`/colors/${id}`, body)
      .catch(err => console.log(err));
    setEditing(false);
    grabColors();
  };

  const grabColors = () => {
    setTimeout(() => {
      axiosWithAuth()
        .get('/colors')
        .then(res => updateColors(res.data))
        .catch(err => console.log(err));
    }, 100);
  }

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res);
        grabColors();
      })
      .catch(err => console.log(err.res));
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
      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}
      <form onSubmit={() => addColor(newColor)}>
        <legend>add color</legend>
        <label>
          color name:
          <input onChange={addColorChangeHandler} value={newColor.color} />
        </label>
        <label>
          hex code:
          <input onChange={addHexChangeHandler} value={newColor.code.hex} />
        </label>
        <div className='button-row'>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;