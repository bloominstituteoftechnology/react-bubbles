import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory} from 'react-router-dom'


const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, getColors, setColorList }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { push } = useHistory();

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };


  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        const newColorList = colors.map(color => {
          if (color.id === colorToEdit.id) {
            return colorToEdit;
          }
          return color;
        })
        setColorList(newColorList)
        push('/bubbles-page')
      })
      .catch((err) => console.error('error', err.message));
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => getColors())
      .catch(err => console.error('error', err.message));
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={(e) => {
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
        <form>
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
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button onClick={e => saveEdit(e)}>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />

    </div>
  );
};

export default ColorList;