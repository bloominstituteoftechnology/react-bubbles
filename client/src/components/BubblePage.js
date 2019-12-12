import React, { useState, useEffect } from "react";
import api from "../utilities/axios";


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const [error, setError] = useState();

  useEffect(() => {
    api()
      .get("/colors")
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => setError(err));
  }, []);

  return (
    <>
      {error && <div className="delete">{`${error}`}</div>}
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
