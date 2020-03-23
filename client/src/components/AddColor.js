import React, { useState } from 'react';
import { axiosWithAuth } from '../auth/axiosWithAuth';

const AddColor = props => {
    const [newColor, setNewColor] = useState({
        name: '',
        code: { hex: '' }
    });
  
    const handleChange = e => {
        e.preventDefault();
        setNewColor({
            ...newColor,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        console.log('I am a new color', newColor);
        e.preventDefault();
        axiosWithAuth()
        .post(`/api/colors/`, newColor)
        .then(res => {
            console.log(res.data);
            setNewColor({ newColor: res.data })
            props.history.push('/bubble-list')
        })
        .catch(err => console.log('Oops, I do not work', err));
    }

   return (
       <div classNam='add-color'>
             return (
            <div>    
               <form onSubmit={handleSubmit}>
                 <label htmlFor='name'></label>
                   <input key={newColor.id}
                     type='text'
                     name='name'
                     placeholder='Name'
                     value={newColor.name}
                     onChange={handleChange}
                    /><br /> 
                 <label htmlFor='age'></label>
                   <input 
                     type='text'
                     name='code'
                     placeholder='code'
                     value={newColor.code}
                     onChange={handleChange}
                    /><br /> 
                <button className='btn'>Add Color!</button>
               </form>                          
            </div>
        )



       </div>
   )

}

export default AddColor;