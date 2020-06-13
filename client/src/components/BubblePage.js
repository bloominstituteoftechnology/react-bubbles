import React, { useState, useEffect } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosAuth from "../utils/axiosAuth";

const BubblePage = () => {
	const [colorList, setColorList] = useState([]);
	// fetch your colors data from the server when the component mounts
	// set that data to the colorList state property
	useEffect(() => {
		axiosAuth()
			.get("/api/colors")
			.then((res) => {
        console.log('get res',res);
        setColorList(res.data)
			})
			.catch((err) => console.log(err.response));
	},[]);
	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;
