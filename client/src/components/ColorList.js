import React, { useState } from "react";
import { axiosWithAuth } from "../utils/AxiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log('Save Edit', colors)
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log('Saving Edit Data', res.data)
      setter()
    })
    .catch(err => console.log(err))
  };

  const deleteColor = color => {
   axiosWithAuth()
   .delete(`/api/colors/${color.id}`)
   .then(res => {
     console.log('Delete Object', res.data)
     setter()
   })
   .catch(err => console.log(err))
  };

  const addForm = e => {
    axiosWithAuth()
    .post(`/api/colors`, addColor)
    .then(res => {
      console.log('Add New Color', res.data)
      setter()
    })
    .catch(err => console.log(err))
  }

  const setter = () => {
    axiosWithAuth()
    .get('/api/colors')
    .then(res => {
      console.log('Update Setter Res', res)
      updateColors(res.data)
      setEditing(false)
      setAddColor(res.data)
    })
    .catch(err => console.log(err))
  }
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
      <div>
      <form onSubmit={addForm}>
          <legend>new color</legend>
          <label>
            Color:
            <input
            type='text'
            name='color'
              onChange={e =>
                setAddColor({ ...addColor, color: e.target.value })
              }
              value={addColor.color}
            />
            </label>
            <label>
              HexCode:
            <input
            type='string'
            name='hex'
              onChange={e =>
                setAddColor({
                  ...addColor,
                  code: { hex: e.target.value }
                })
              }
              value={addColor.code.hex}
            />
            </label>
            <div className="button-row">
            <button type="submit">Add</button>
            </div>
        </form> 
      </div>
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
    </div>
  );
};

export default ColorList;
