import React from "react";

class ColorList extends React.Component {
  state = {
    colors: "",
    code: { hex: "" }
  };

 


  editColor = color => {
    this.setEditing(true);
    this.setColorToEdit(color);
  };

  saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  deleteColor = color => {
    // make a delete request to delete this color
  };

  render() {
    return (
      <div className="colors-wrap">
        <p>colors</p>
        <ul>
          {this.state.colors.map(color => (
            <li key={color.color} onClick={() => this.state.editColor(color)}>
              <span>
                <span
                  className="delete"
                  onClick={e => {
                    e.stopPropagation();
                    this.state.deleteColor(color);
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
        {this.state.editing && (
          <form onSubmit={this.state.saveEdit}>
            <legend>edit color</legend>
            <label>
              color name:
              <input
                onChange={e =>
                  this.setColorToEdit({ ...this.state.colorToEdit, color: e.target.value })
                }
                value={this.state.colorToEdit.color}
              />
            </label>
            <label>
              hex code:
              <input
                onChange={e =>
                  this.setColorToEdit({
                    ...this.state.colorToEdit,
                    code: { hex: e.target.value }
                  })
                }
                value={this.state.colorToEdit.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">save</button>
              <button onClick={() => this.state.setEditing(false)}>cancel</button>
            </div>
          </form>
        )}
        <div className="spacer" />
        {/* stretch - build another form here to add a color */}
      </div>
    );
  }
}
export default ColorList;
