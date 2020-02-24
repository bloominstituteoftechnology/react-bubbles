import React, { useState } from "react";
import AxiosWithAuth from './axiosWithAuth'
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    AxiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(() => {
      AxiosWithAuth().get(`/colors`)
      .then(res => updateColors(res.data))
    })
    .catch(err => console.log(err))
    setEditing(false)
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    AxiosWithAuth().delete( `/colors/${color.id}`)
    .then(() => {
      AxiosWithAuth().get(`/colors`)
      .then(res => updateColors(res.data))
    })
    .catch(err => console.log(err))
    // make a delete request to delete this color
  };

  const addColor = e => {
    e.preventDefault()
    AxiosWithAuth()
    .post('/colors', colorToAdd)
    .then(res => {
      console.log(res)
      updateColors([...colors, colorToAdd])
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={(e) => {
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




      <div />
      
      <form >
        <legend> add color </legend>
        
        <label > Color Name: </label>
        <ul>
        <input  
        onChange={e => setColorToAdd({
          ...colorToAdd, color: e.target.value
        })}

        value={colorToAdd.color}
        
        />
        </ul>

        <label> Hex Color </label>
        <ul>
        <input 
        onChange={e => {
          setColorToAdd({
            ...colorToAdd, code: {hex: e.target.value}
          })
        }}
        value={colorToAdd.code.hex}

        />
        </ul>

        <div className='buttonl'><button onClick={addColor}>add</button></div>
      </form>
      {/* stretch - build another form here to add a color */}


    </div>
  );
};

export default ColorList;
