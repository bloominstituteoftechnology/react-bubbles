import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [pageRefresh, setPageRefresh] = useState(false);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    api().get('/api/colors')
      .then(res => {
        console.log(res.data)
        setColorList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [pageRefresh])

  function refresh() {
    return (
  setPageRefresh(!pageRefresh)
    )
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} refresh={refresh} />
      <Bubbles colors={colorList}  />
    </>
  );
};

export default BubblePage;
