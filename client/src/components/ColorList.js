import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../auth/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const newColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors, newcolor }) => {
 
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [remove, setRemove] = useState({});
  const [addColor, setAddColor] = useState(newColor);
    

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
      .then((res) => {  
        console.log(res)      
        updateColors(colors.map(color => {
            if(color.id === res.data.id) {
              return res.data
            } 
            return color;
          }));
      }).catch(err => console.log(err));
         
    } 

  const deleteColor = (remove) => {
     // make a delete request to delete this color
    axiosWithAuth()
     .delete(`/api/colors/${remove.id}`, remove)
     .then((res) => {
       console.log(res)
       setRemove({ delete: res.data })
       updateColors(colors.filter(color => {
          if(color.id !== res.data.id) { 
            return res.data//params is the correct property for 
            //.delete. data is for the other methods
          }
          return color;
     }) 
   );    
        
  })    
     .catch(err => console.log(err));
  };

  const addNewColor = e => {
   e.preventDefault();
    axiosWithAuth()
    .post(`/api/colors/`, addColor)
    .then((res) => {
      console.log(res.data);
      setAddColor({ addColor: res.data });
       return res.data;
      this.history.push('/bubble-list')
    })
    .catch(err => console.log('Oops! I don\'t work', err));

 }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors && colors.map(color => (
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
      {addColor && (
          <form onSubmit={addNewColor}>
            <label>color name:
              <input 
                onChange={e => setAddColor({
                  ...addColor,
                  color: e.target.value
                })}                 
                value={addColor.color}
              />
              </label>
              <label>hex code:
              <input 
                onChange={e => setAddColor({
                  ...addColor,
                  code: {hex: e.target.value}
                })
               }
               value={addColor.code.hex}
              />
             </label> 
             <button type='submit'>add</button>
           </form>
        )}
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
     </div> 
    );
};

export default ColorList;
