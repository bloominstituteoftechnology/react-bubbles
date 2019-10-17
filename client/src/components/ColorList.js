import React, { useState } from "react";
import axios from "axios";
import { axiosAuth } from "./axiosAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
   const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
     const id = color.id
    axiosAuth()
    .post(`http://localhost:5000/api/colors`,color)
    .then(res=>{
    //  updateColors(color)  
       
     // setColorToEdit(res.data)
     console.log("COLOR TO EDIT", color)
     console.log("REZ", res.data )
   } )
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
     const id = colorToEdit.id
    const color =colorToEdit
    // updateColors(color)
      setEditing(true)
     console.log("COLOR TO PUT",color)
    // console.log("COLOR", initialColor)
    //  console.log("ID", id)
    axiosAuth()
    .put(`http://localhost:5000/api/colors/${id}`,color)
    .then(res => { console.log("PUT DATA",res.data)
          // setEditing(false);
  
     })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
       const id =color.id
    console.log('ID',id)
    const filtered = colors.filter(e => 
       e.id !== id )
         
     
  //  updateColors(filtered)
 

     axiosAuth()
    .delete(`http://localhost:5000/api/colors/${id}`,color)
    .then(res => {
      console.log("DELETE THIS=>",res.data )
      console.log(id)
      console.log("REZ-DELETE",res)
      console.log("COLORS",colors)
      console.log("COLOR",color)
      //  setColorToEdit(color)
        console.log("FILTERED", filtered)
       updateColors(filtered)

        

       
      


        
       


     
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() =>
                // e.stopPropagation,
                 deleteColor(color)}>
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
    </div>
  );
};

export default ColorList;
