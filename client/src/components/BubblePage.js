import React from "react";
import {axiosWithAuth} from "./axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

class BubblePage extends React.Component{
  contructor(){

    this.state={
      colorList: [],
      newColor: {
        hexcode: this.color,
        id: Date.now(),
      },
      color: "",
    }
  }
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
getData = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res =>{
        this.setState({colorList: res.data});
        console.log("this", res.data)
      })
      .catch(err =>{
        console.log(err);
      })
    }

componentDidMount(){
    this.getData()
  }

  onChangeHexCode = (e) =>{
    e.preventDefault();
    this.setState({color: e.target.value})
  }

  onSubmitting = () => {
    this.setState({newColor: {hexcode: this.color, ...this.newColor}})
  }
  render(){
  return (
    <>
      <ColorList colors={this.colorList} updateColors={this.setState({colorList: this.setColorList})} />
      <Bubbles colors={this.colorList} />
      <form onSubmit={this.onSubmitting}>
        <input
        type="text"
        placeholder="enter hexcode here"
        name="color"
        onChange={this.onChangeHexCode}/>
      </form>
    </>
  );
};
};
export default BubblePage;
