import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const deleteColorList = colorId => {
    setColorList(
      colorList.filter(color => {
        return color.id !== colorId;
      })
    );
  };

  const editColors = newColorObj => {
    setColorList(
      colorList.map(colorobj => {
        if (colorobj.id === newColorObj.id) {
          return newColorObj;
        } else {
          return colorobj;
        }
      })
    );
  };

  const addColor = newColorObj => {
    setColorList([...colorList, newColorObj]);
  };

  useEffect(() => {
    AxiosWithAuth()
      .get("/colors")
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  return (
    <>
      <ColorList
        deleteColorList={deleteColorList}
        editColors={editColors}
        colors={colorList}
        updateColors={setColorList}
        addColor={addColor}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;