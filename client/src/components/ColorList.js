import React, { useState } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" },
  id: ''
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor)
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  const [error, setError] = useState(false);
  console.log('Colors in ColorList.js:',colors);
  console.log('colorToEdit in ColorList.js:', colorToEdit);
  console.log('colorToAdd in ColorList.js:', colorToAdd);
  console.log('Error State:', error)
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  const addColor = e => {
    setError(false);
    console.log('adding color...')
    console.log(colorToAdd.color)
    e.preventDefault();
    // if((colorToAdd.code.hex || colorToAdd.color) !== (colorToAdd.code.hex || colorToAdd.color))
    // colors.forEach(item => {
    //   console.log(item.color);
    //   (((colorToAdd.code.hex === item.code.hex) || (colorToAdd.color === item.color)) ? setError(true) : setError(false))
    // })
    // // {(error) ? console.log('error') : console.log('no-error')}
    // if(!error && (colorToAdd.code.hex !== '') && (colorToAdd.color !== '')){
    //    axiosWithAuth()
    //   .post('/api/colors', colorToAdd)
    //   .then(res => (console.log('Added Color:', res), updateColors(res.data)))
    //   .catch(err => console.log(err))
    //   setError(false)
    // }else{
    //   setError(true);
    // }
    axiosWithAuth()
    .post('/api/colors', colorToAdd)
    .then(res => (console.log('Added Color:', res), updateColors(res.data)))
    .catch(err => console.log(err))
  }
  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    let newColors = [];
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => (
        console.log('Put Request Response:',res), 
        updateColors([...colors.filter(color => color.id !== res.data.id), res.data]),
        console.log('Updated Colors', colors.sort()),
        newColors= [...colors.filter(color => color.id !== res.data.id), res.data],
        console.log('newColors', newColors.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))),
        updateColors(newColors.sort())
    ))
    .catch(err => console.log(err))
    
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res => (console.log('deleting color:',res), updateColors([...colors.filter(color => color.id !== res.data)])))
    .catch(err => console.log(err))
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
      
      <div className="spacer" >
        <form onSubmit={addColor}>
            <legend>Add Color</legend>
            <label>
              color name:
              <input
                onChange={e =>
                  setColorToAdd({ ...colorToAdd, color: e.target.value })
                }
                value={colorToAdd.color}
              />
            </label>
            <label>
              hex code:
              <input
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
              <button type="submit">Add New Color</button>
            </div>
            {(error) ? <p style={{color:'red'}}>Error: Check Values</p> : <p></p>}
          </form>
          {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit Color</legend>
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
        </div>
      
    </div>
  );
};

export default ColorList;
