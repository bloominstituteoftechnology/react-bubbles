import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import axiosWithAuth from '../utlis/axiosWithAuth';

const BubblePage = () => {
    const [colorList, setColorList] = useState([]);
    
    const fetchData = () => {
        axiosWithAuth()
            .get(`http://localhost:5000/api/colors`)
            .then(res => {
              console.log(res)
              setColorList(res.data);
            })
            .catch(err => {
              console.log(err);
            })
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <>
            <ColorList colors={colorList} updateColors={setColorList} />
            <Bubbles colors={colorList} />
        </>
  );
};

export default BubblePage;
