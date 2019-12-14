import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import styled from 'styled-components';

const Container = styled.div`
border: .1px dashed lightgrey;
padding-bottom: 8%;
`

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
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then (result => {
        updateColors ([
          ...colors.filter(color => color.id !== colorToEdit.id), result.data]);
          setEditing(false);
      })
      .catch (error => 
        console.log('kd:colorlist:axios.put: editing error', error));
  };

  const deleteColor = removeColor => {
    // make a delete request to delete this color
    console.log('kd:colorList:deletecolor:color')
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${removeColor.id}`)
      .then (()=> {
        updateColors (colors.filter(color => color.id !== removeColor.id))
      })
      .catch (error => 
        console.log('kd:colorlist:axios.delete:error', error));
  };

  return (
    <div className="colors-wrap">
      <p>COLORS</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color.id)
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
        <Container>
        <form onSubmit={saveEdit}>
          <legend>Edit color</legend>
          <label>
            Color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            Hex code:
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
            <button type="submit">Save edit</button>
            <button onClick={() => setEditing(false)}>cancel</button>
            <button onClick={() => deleteColor}>Delete color</button>
          </div>
        </form>
        </Container>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
