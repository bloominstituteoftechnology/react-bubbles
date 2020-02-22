import React from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

 class  BubblePage extends React.Component{
   state = {
     colorList :[]
   };
  
  componentDidMount() {
    this.getData();
 }
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
   getData = () => {
    axiosWithAuth()
        .get('/api/colors')
        .then(res => {
            console.log("Data returned from the axios.GET", res.data);
            this.setState({
              colorList:res.data
              });
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
