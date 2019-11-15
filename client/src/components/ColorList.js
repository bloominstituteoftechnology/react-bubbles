import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  fetchData,
  updateColor,
  deleteColor,
  addingColor
} from "../actions/axiosActions";

const initialColor = {
  color: "",
  code: { hex: "" }
};
// { colors, updateColors }
const ColorList = props => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);
  const [coloradding, setColorAdding] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    props.updateColor(colorToEdit);
    props.setChangeData(true);
    setEditing(false);
  };

  const deleteColor = del => {
    props.deleteColor(del);
    props.setChangeData(true);
  };

  const addingColor = event => {
    event.preventDefault();
    props.addingColor(coloradding);
    props.setChangeData(true);
    setAdding(false);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {props.colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
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
      <button onClick={() => setAdding(true)}>add Color</button>
      {adding && (
        <form>
          <label htmlFor="name">Color Name: </label>
          <input
            name="name"
            id="name"
            placeholder="color name"
            onChange={e =>
              setColorAdding({ ...coloradding, color: e.target.value })
            }
          />
          <label htmlFor="code">Code Hex: </label>
          <input
            name="code"
            placeholder="code hex"
            onChange={e =>
              setColorAdding({ ...coloradding, code: { hex: e.target.value } })
            }
          />
          <button onClick={addingColor}>add</button>
          <button onClick={() => setAdding(false)}>cancel</button>
        </form>
      )}
      <div className="spacer" />

      {/* stretch - build another form here to add a color */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    colors: state.data
  };
};

export default connect(mapStateToProps, {
  fetchData,
  updateColor,
  deleteColor,
  addingColor
})(ColorList);
