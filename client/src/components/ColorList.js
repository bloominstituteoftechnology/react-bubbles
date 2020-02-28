import React, { useState } from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth';

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
    setColorToEdit(color);
  };

  const saveEdit = e => {
    // e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then( res => {
        setColorToEdit(res.data)
      })
      .catch( err => {
        console.log('edit error with the put request', err)
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then( res => {
        setEditing(res.data);
        colors.history.push('/')
      })
      .catch( err => console.log(err))
      window.location.reload();
  };

  const handleSubmit = (e) => {
    axiosWithAuth().post('/api/colors', colorToEdit)
      .then( res => {
        setColorToEdit(res.data)
      })
      .catch( err => console.log(err))
  }

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
      <form onSubmit={handleSubmit}>
        <legend>Add New Color</legend>
        <label>color name:
          <input
            type='text'
            name='color'
            placeholder="Enter color name"
            onChange={e => 
              setColorToEdit({ ...colorToEdit, color: e.target.value})
            }
            value={colorToEdit.color}
          />
        </label>
        <label>hex code:
          <input
            type='text'
            name='code'
            placeholder="Enter color code"
            onChange={e =>
              setColorToEdit({ 
                ...colorToEdit, 
                code: {hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
        </label>
        <div className='button-row'>
          <button>Add new color</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;