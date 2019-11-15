import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchData, updateColor, deleteColor } from "../actions/axiosActions";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = props => {
  const [colorList, setColorList] = useState(props.data);

  const [changeData, setChangeData] = useState(false);
  useEffect(() => {
    props.fetchData();
    setChangeData(false);
  }, [changeData]);
  console.log(changeData);
  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        setChangeData={setChangeData}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default connect(state => state, { fetchData })(BubblePage);
