import React, { useState, useEffect } from "react";

const BubblesV2 = ({colors}) => {

    return (
        <div className="bubblesV2Div">
            {colors.map((bubble, id) => {

                let diameter = Math.floor(((Math.random() * 10) + 1)) * 10;
                let leftPosition = Math.floor(((Math.random() * 10) + 1)) * 10;
                let topPosition = Math.floor(((Math.random() * 10) + 1)) * 10;
                let style = { backgroundColor: bubble.code.hex, width: diameter, height: diameter, zIndex: -id, left: leftPosition, top: topPosition}
            
                return (<div className="bubblesv2" style={style}></div>)
                
            })}
        </div>
        )
}

export default BubblesV2;