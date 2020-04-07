import React, {useState, useContext} from 'react';
import Context from './Context';

function AddColorForm () {
    const [newColor, setNewColor] = useState ({ 
        color: "",
        code: "",
        id: ''
    });

    const {addColor} = useContext (Context);

    const handleChange = event => {
        setNewColor (
            {...newColor,
            [event.target.name] : event.target.value
        });
    };

    function handleSubmit () {
        addColor(newColor)
    };

    return (
        <>
        
        <form onSubmit = {handleSubmit} >
            <input 
                type = 'text'
                name = "color"
                value = {newColor.color}
                placeholder = "New Color"
                onChange = {handleChange}
            />
           <input  
                type ='text'
                name = 'code'
                value = {newColor.code}
                placeholder = 'hex code'
                onChange = {handleChange}
            />
        <button>Add new color</button> 
        </form>
        
        </>
    )
}

export default AddColorForm;