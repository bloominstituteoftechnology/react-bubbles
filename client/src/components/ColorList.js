import React, { useState } from "react";
import { authWithAxios } from "./authWithAxios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    console.log(color)
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    authWithAxios()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors([...colors.filter((e) => {
          if (e.id != colorToEdit.id) {
            return e;
          }
        }), res.data]);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  };

  const deleteColor = color => {
    console.log(color)
    // make a delete request to delete this color
    authWithAxios()    
    .delete(`http://localhost:5000/api/colors/${color.id}`)
       .then(res => {
        updateColors(colors.filter((e) => {
          if (e.id != colorToEdit.id) {
            return e;
          }

        }));
        window.location.reload()
        color({
          deleteSuccessMessage: res.data.successMessage,
          deleteError: ""
        });
          console.log(res)
       })
       .catch(err => {
         console.log(err)
       });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {console.log(colors)}
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
              onChange={e => {
                console.log({ ...colorToEdit, color: e.target.value })
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }}
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
    </div>
  );
};

export default ColorList;
