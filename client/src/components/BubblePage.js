import React from "react";
import ColorList from "./ColorList";
import axios from "axios";


class BubblePage extends React.Component {
  state ={
    colors: []
  }

  componentDidMount(){
    this.getData()
  }
  

  // fetch your colors data from the server when the component mounts
getData = () => {
  const token = window.localStorage.getItem("token")

  axios.get('http://localhost:5000/api/colors', {
    headers: {
      authorization: token
    }
  })
  .then(res => {
    this.setState({
      colors: res
    })
    console.log(res)
  })
  .catch(error => console.log(error))
  // set that data to the colorList state property
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
     <ColorList />
    </>
  );
}
};

export default BubblePage;
