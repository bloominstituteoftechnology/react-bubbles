import React, {useState, useContext} from 'react';
import BubbleContext from './BubbleContext';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 2%;
    border:.5px solid lightgrey;
    padding: .5%;
`

function AddColorForm () {
    const [newColor, setNewColor] = useState ({ 
        color: "",
        code: '',
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
        <Container>
        <form onSubmit = {handleSubmit} >
            <input 
                type = 'text'
                name = "color"
                value = {newColor.color}
                placeholder = "New Color"
                onChange = {handleChange}
            />
            <br></br>
            <br></br>

            <input  
                type ='text'
                name = 'code'
                value = {newColor.code}
                placeholder = 'hex code'
                onChange = {handleChange}
            />

            <br></br>
            <br></br>

            <button className = "addColor-btn">Add new color</button> 
            <hr></hr>
        </form>
        </Container>
        </>
    )
}

export default AddColorForm;