import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useRouteMatch, useHistory } from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const match = useRouteMatch();
  const history = useHistory();
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
  code: { hex: "" }
  })

  console.log('colors', colors)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?


    console.log('colorToEdit', colorToEdit)
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)

      .then(res => {
        console.log('res inside put', res)
        console.log('res.data', res.data);
        // console.log('match.params.id inside put', match.params.id)
        // props.getMovieList();
        axiosWithAuth().get('http://localhost:5000/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => console.log(err))
        console.log(res.data.payload);
        history.push(`/`)

      })
      .catch(err => {
        console.log('err inside catch', err);
      })

  };

  const deleteColor = color => {
    // make a delete request to delete this color

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?


    console.log('colorToEdit', colorToEdit)
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`, color)

      .then(res => {
        console.log('res inside put', res)
        console.log('res.data', res.data);
        // console.log('match.params.id inside put', match.params.id)
        // props.getMovieList();
        axiosWithAuth().get('http://localhost:5000/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => console.log(err))
        console.log(res.data.payload);
        history.push(`/`)

      })
      .catch(err => {
        console.log('err inside catch', err);
      })
  };

  const addColor = (e) => {
    e.preventDefault();
    console.log(newColor)

    axiosWithAuth()
      .post('http://localhost:5000/api/colors', newColor)
      .then(res => {
        axiosWithAuth().get('http://localhost:5000/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => console.log(err))
        console.log(res.data.payload);

        // props.history.push('/friendslist')
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleChange = (e) => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value })
  }

  const handleHexChange = (e) => {
    setNewColor({...newColor, code: {hex: e.target.value}})
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

      <form onSubmit={(e) => addColor(e)}>
        <p>Color:</p>
        <input
          type='text'
          name='color'
          onChange={(e) => handleChange(e)}
        />
        <p>Hex:</p>
        <input
          type='text'
          name='hex'
          onChange={(e) => handleHexChange(e)}
        />

        <p></p>
        <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
