import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors, getColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);

  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addingColor, setAddingColor] = useState(false);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  console.log('ColorList.js colorToEdit: ', colorToEdit);
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('ColorList.js .put res: ', res);
        getColors();
        setEditing(false);
      })
      .catch(err => {
        alert('ColorList.js err', err.response);
        console.log(err);
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log('ColorList.js .delete res', res);
        getColors();
      })
      .catch(err => {
        alert('ColorList.js .delete err', err);
      });
  };

  const addColor = (e, color) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/colors`, color)
      .then(res => {
        console.log('ColorList.js .post res', res);
        getColors();
        setAddingColor(false);
      })
      .catch(err => {
        alert('ColorList.js .post err', err);
      });
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <button onClick={() => setAddingColor(!addingColor)}>add color</button>
      {/* ======== EDIT COLOR ================== */}
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
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* ============== ADD NEW COLOR ================= */}
      <div className='spacer' />
      {addingColor && (
        <form onSubmit={e => addColor(e, colorToAdd)}>
          <legend>add color</legend>
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
          <div className='button-row'>
            <button type='submit'>add</button>
            <button onClick={() => setAddingColor(false)}>cancel</button>
          </div>
        </form>
      )}

      <ul>
        {colors.map(color => (
          <li key={color.color}>
            <span className='delete' onClick={() => deleteColor(color)}>
              x
            </span>{' '}
            <span onClick={() => editColor(color)}>{color.color}</span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
    </div> /* COLOR WRAP TOP CONTAINER */
  );
};

export default ColorList;
