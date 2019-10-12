import React, { useState } from "react"
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
}

const ColorList = ({ colors, updateColors }) => {
  
  const [editing, setEditing] = useState(false)
  const [colorToEdit, setColorToEdit] = useState(initialColor)
  const [colorToAdd, setColorToAdd] = useState(initialColor)

  const editColor = color => {
    setEditing(true)
    setColorToEdit(color)
  }

  const saveEdit = e => {
    e.preventDefault()
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors( 
          colors.map(color => {
            if (color.id === colorToEdit.id) return res.data
            else return color
          })
        )
        setEditing(false)
        setColorToEdit(initialColor)
      })
      .catch(err => console.log(err))
  }

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(colorCheck => colorCheck.id !== res.data))
      })
      .catch(err => console.log(err))
  }

  const addColor = () => {
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors`, colorToAdd)
    .then(res => {
      updateColors(res.data)
      setColorToAdd(initialColor)
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

      {/* <div className="spacer" /> */}

      <form>
        <legend>add color</legend>
        
        <label>
          color name:
          <input
            type='text'
            name='color'
            onChange={event => 
              setColorToAdd({ ...colorToAdd, color: event.target.value })
            }
            placeholder='color name'
            value={colorToAdd.color}
          />
        </label>

        <label>
          hex code:
          <input
            type='text'
            name='hex'
            onChange={event => 
              setColorToAdd({ ...colorToAdd, code: { hex: event.target.value }})}
            placeholder="hex code"
            value={colorToAdd.code.hex}
          />
        </label>

        <div className="button-row">
          <button type='button' onClick={() => addColor()}>submit</button>
        </div>
      </form>
    </div>
  )
}

export default ColorList
