import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useParams } from 'react-router-dom';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, getColors }) => {
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

   const { id } = useParams();

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  
  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/:id/${id}`, colorToEdit)
      .then(res => {
        getColors();
      })
      .catch(err => console.error('error', err.message));
  };
  
  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
          getColors()
      })
      .catch(err => {
          console.error(err.message, err.response)
      });
  };

  return (
    <div className='colors-wrap'>
      <p>Colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
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
              onChange={(e) =>
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
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
     
    </div>
  );
};

export default ColorList;