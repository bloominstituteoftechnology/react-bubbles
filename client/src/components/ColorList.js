import React, { useState } from "react";
import api from "../utils/api";

const initialColor = {
  color: "",
  code: { hex: "" }
};

function ColorList({ colors, updateColors, refresh }) {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
  
// :id is dynamic - not part of the url.

    api().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(refresh())
      .then(res => {
        console.log(res)
        setEditing(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const saveNewColor = e => {
  api().post(`/api/colors/${newColor}`, newColor)
    .then(res => {
      console.log(res)
      // setNewColor(true)
    })
    .catch(error => {
      setEditing(error)
    })
  }

  const deleteColor = (color) => {
    // make a delete request to delete this color
      // e.preventDefault()

      if (window.confirm('Delete color?')) {

        api().delete(`/api/colors/${color.id}`)
          .then(refresh())
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
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
       <form onSubmit={saveNewColor}>
        <label> 
        new color:
        <input 
        onChange={e =>
          setNewColor({ 
            ...newColor,
            new: e.target.value
            })
          }
          //  value={newColor.color.new}
          />
          </label>
          <div className="btn-add">
          <button onClick={() => setNewColor(true)}>add</button>
          </div>
        </form>
    </div>
  );
}
export default ColorList;
