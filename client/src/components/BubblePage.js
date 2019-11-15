import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import axiosWithAuth from '../utils/AxioswithAuth';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  // fetchColor = id => {
  //   //axios
  //   axiosWithAuth
  //     // .get(`"/api/colors"/${id}`)
  //     .then(res => this.setState({ color: res.data }))
  //     .catch(err => console.log(err.response));
  // };



  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
