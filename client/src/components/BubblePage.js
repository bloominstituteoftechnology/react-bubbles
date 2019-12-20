import React from "react";
// import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = props => {
  const [colorList, setColorList] = React.useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  React.useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const updateColor = (id, newColor) => {
    setColorList(colorList.map(color => (color.id === id ? newColor : color)));
  };

  const removeColorById = id => {
    setColorList(colorList.filter(color => color.id !== id));
  };
  return (
    <>
      <ColorList
        {...props}
        colors={colorList}
        updateColor={updateColor}
        removeColorById={removeColorById}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
