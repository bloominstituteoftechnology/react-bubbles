import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import { Form, Input, Button, Icon } from 'semantic-ui-react';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setEditing(false);
        setColorToEdit(initialColor);
        updateColors(
          colors.map(color => {
            return color.id === res.data.id ? res.data : color;
          })
        );
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`, color)
      .then(res => {
        setEditing(false);
        setColorToEdit(initialColor);
        updateColors(
          colors.filter(color => {
            return color.id !== res.data;
          })
        );
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/colors', colorToAdd)
      .then(res => {
        updateColors(res.data);
        setColorToAdd(initialColor);
     })
     .catch(err => console.log(err));
  }
  
  const handleChangeColorName = e => {
    setColorToAdd({
      ...colorToAdd,
      color: e.target.value
    })
  }

  const handleChangeColorCode = e => {
    setColorToAdd({
      ...colorToAdd,
      code: { hex: e.target.value }
    })
  }

  return (
    <div className="colors-wrap">
      <h2>Colors</h2>
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
      {!editing && (
        <Form onSubmit={handleSubmit}>
          <h3>Add Color</h3>
          <Form.Field>
            <label>Color Name:</label>
            <Input 
              type="text"
              placeholder="Color Name"
              onChange={handleChangeColorName}
              value={colorToAdd.color}
            />
          </Form.Field>
          <Form.Field>
            <label>Color Hex:</label>
            <Input 
              type="text"
              placeholder="Color Hex"
              onChange={handleChangeColorCode}
              value={colorToAdd.code.hex}
            />
          </Form.Field>
          <Button positive><Icon name="add" />Add</Button>
        </Form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;