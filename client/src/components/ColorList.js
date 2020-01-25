import React, { useState } from "react";
import axiosWithAuth from '../authenticate/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: '',
    code: { hex: '' }
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(response => {
      console.log('put response', response.data)
      setEditing(false);
      axiosWithAuth()
      updateColors();
    })
    .catch(error => { console.log('Put Error', error) })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(response => {
      console.log('delete response', response.data);
      updateColors();
    })
  };

  const handleColorChange = event => {
    setNewColor({
      ...newColor,
      color: event.target.value
    })
  };

  const handleHexChange = event => {
    setNewColor({
      ...newColor,
      code: { hex: event.target.value }
    })
  };

  const handleColorSubmit = event => {
    event.preventDefault()
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors/`, newColor)
    .then(response => {
      console.log('newColor post', response)
      updateColors()
      setNewColor({
        color: '',
        code: { hex: '' }
      })
    })
    .catch(error => {
      console.log('newColor Error', error)
    })
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
      <p>Add color</p>
      <form onSubmit={handleColorSubmit}>
        <input 
        type='text'
        name='color'
        placeholder='Color Name'
        value={newColor.color}
        onChange={handleColorChange}
        />
        <input 
        type='text'
        name='hex'
        placeholder='Color Hex'
        value={newColor.code.hex}
        onChange={handleHexChange}
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default ColorList;
