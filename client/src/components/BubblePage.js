import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

 class  BubblePage extends React.Component{
   state = {
     colorList :[]
   };
  // const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  componentDidMount() {
    this.getData();
 }
 
   getData = () => {
    axiosWithAuth()
        .get('/api/colors')
        .then(res => {
            console.log("Data returned from the axios.get", res.data);
            this.setState({
              colorList:res.data
              })
            })
        .catch(err => console.error(err));
}
  render(){
    return (
      
      <>
        <ColorList colors={this.state.colorList} updateColors={this.state.setState} />
        <Bubbles colors={this.state.colorList} />
      </>
    );
  }
};

export default BubblePage;
