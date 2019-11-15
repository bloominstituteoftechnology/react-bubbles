import React, { useState, useEffect } from "react";
import { Pack } from "@potion/layout";
import { Svg, Circle } from "@potion/element";
import { connect } from "react-redux";

// { colors }
const Bubbles = props => {
  console.log(props.colors);
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = props.colors.map((_, i) => ({
      value: Math.floor(Math.random() * (props.colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [props.colors]);
  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={400} height={400}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < props.colors.length) {
                  return (
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={props.colors[i].code.hex}
                    />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    colors: state.data
  };
};
export default connect(mapStateToProps, {})(Bubbles);
