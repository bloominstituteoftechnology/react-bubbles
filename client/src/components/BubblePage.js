import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchData } from "../actions/axiosActions";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = props => {
  console.log(props.data);
  const [colorList, setColorList] = useState(props.data);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  console.log(colorList);
  useEffect(() => {
    props.fetchData();
    // setColorList(props.data);
  }, [fetchData]);
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default connect(state => state, { fetchData })(BubblePage);
