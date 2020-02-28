import React from "react";
import axios from "axios";


class BubblePage extends React.Component {
  state ={
    colors: '',
    code:{
      hex: ''
    }
  }

  componentDidMount(){
    this.getData()
  }
  

  // fetch your colors data from the server when the component mounts
getData = () => {
  axios
  .get('http://localhost:5000/api/colors')
  .then(res => console.log(res))
  .catch(err =>console.log(err))
  // const token = window.localStorage.getItem("token")

  
}

render(){
  return (
    <>
    <h1>Welcome</h1>
     <div>
       {this.state.colors.map(color => (
         <p key={color.id}>{color.color}</p>
       ))}
     </div>
    </>
  );
}
};

export default BubblePage;
