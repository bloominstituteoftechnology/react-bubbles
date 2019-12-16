import React, {useState, useContext} from 'react';
import BubbleContext from './BubbleContext';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 5%;
    width:50%;
    border: .5px dashed teal;
    padding-left: 2%;
    padding-right: 2%; 
    box-shadow: 6px 6px 6px grey;
    background-color:white;
`

function AddColorForm () {
    const [newColor, setNewColor] = useState ({ 
        color: "",
        hex: "" ,
        id: ''
    });

    const {addColor} = useContext (BubbleContext);

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
        <center><Container>
        <form onSubmit = {handleSubmit} >
            <center><input 
                type = 'text'
                name = "color"
                value = {newColor.color}
                placeholder = "New Color"
                onChange = {handleChange}
            /></center>
            <br></br>

            <center><input  
                type ='text'
                name = 'code'
                value = {newColor.hexcode}
                placeholder = 'hex code'
                onChange = {handleChange}
            /></center>

            <br></br>

            <center><button className = "addColor-btn">Add new color</button></center>
            <hr></hr>
        </form>
        </Container></center>
        </>
    )
}

export default AddColorForm;