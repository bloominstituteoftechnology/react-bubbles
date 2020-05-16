import React from "react";
import {axiosWithAuth} from "./axiosWithAuth";
import axios from "axios";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

class BubblePage extends React.Component{
  constructor(){
    super()
    this.state={
      colorList: [],
      newcolor: {
      code: {
        hex:this.code
      },
      color: this.color, 
      id: ""
      },
      color: "",
      name: ""
    }
  }
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
getData = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res =>{
        this.setState({colorList: res.data})
      })
      .catch(err =>{
        console.log(err);
      })
    }

 componentDidMount(){
  this.getData();
  }

  onChangeHexCode = (e) =>{
    e.preventDefault();
    this.setState({newcolor: {...this.state.newcolor, code: e.target.value}})
  }
  
  onChangeColorName = (e) =>{
    e.preventDefault();
    this.setState({newcolor: {...this.state.newcolor, color: e.target.value}})
  }

  onSubmitting = (e) => {
    e.preventDefault()
    this.setState({hexcode: this.state.color})
    axiosWithAuth()
    .post("http://localhost:5000/api/colors", this.state.newcolor)
    .then(res => {
      this.setState({colorList: res.data})
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  render(){
    console.log(this.state.colorList)
  return (
    <>
      <div>
        <ColorList colors={this.state.colorList} />
        <Bubbles colors={this.state.colorList} />
      </div>
      <form onSubmit={this.onSubmitting}>
      <input
        type="text"
        placeholder="enter name of color here"
        name="color"
        onChange={this.onChangeColorName}/>
        <input
        type="text"
        placeholder="enter hexcode here"
        name="color"
        onChange={this.onChangeHexCode}/>
        <button>Still Not Forgetting The Button</button>
      </form>
    </>
  );
};
};
export default BubblePage;
