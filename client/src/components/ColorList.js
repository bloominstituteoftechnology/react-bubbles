import React, { useState } from "react";
import axiosWithAuth from './axiosWithAuth';
import useInput from './useInput';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToCreate,setColorToCreate,handleColorToCreate] = useInput('')
  const [hexCode,setHexCode,handleHexCode] = useInput('')

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      color: colorToCreate,
      code: {hex: hexCode}
    }

    axiosWithAuth().post("/api/colors", data)
    .then(res => {
      console.log(res)
      updateColors(res.data)
    })
    .catch(err => {
      HTMLFormControlsCollection.log(err)
    })
  }

  const saveEdit = e => {
    e.preventDefault();

    const color = colors.find(color => { return color.color === colorToEdit.color})
  
   
     axiosWithAuth().put(`/api/colors/${color.id}`, colorToEdit)
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res)
        window.location.reload()
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
        <form onSubmit={handleSubmit}>
            <legend>add color</legend>
            <label>color name</label>
            <input type='text' name='color name' value={colorToCreate} onChange={e => handleColorToCreate(e.target.value)}></input>
            <label>hex code</label>
            <input type='text' name='hex code' value={hexCode} onChange={e => handleHexCode(e.target.value)}></input>
            <button type='submit'>add</button>
      </form>
      
      <div className="spacer" />
     
    </div>
  );
};

export default ColorList;
