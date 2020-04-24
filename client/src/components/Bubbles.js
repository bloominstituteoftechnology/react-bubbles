import React, { useState, useEffect } from "react";
import { Pack, Chord } from "@potion/layout";
import { Svg, Circle, Ribbon } from "@potion/element";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  const [ribbonData, setRibbonData] = useState([]);

  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  useEffect(()=>{
    colors.map(color=>{
      setRibbonData([...ribbonData,[
        Math.floor(Math.random() * (colors.length * 1)) + 1,
        Math.floor(Math.random() * (colors.length * 2)) + 1,
        Math.floor(Math.random() * (colors.length * 2)) + 1,
        Math.floor(Math.random() * (colors.length * 2)) + 1
      ]])
    })
  },[colors])

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={400} height={400}>
        <Chord
          data={ribbonData}
          animate
          nodeEnter={d => ({
            ...d,
            sourceStartAngle: d.sourceEndAngle,
            targetStartAngle: d.targetEndAngle,
          })}
        >{nodes => nodes.map((node, i) => (
          
          <Ribbon
            {...node}
            fill={colors[i].code.hex}
            stroke="black"
            fillOpacity={0.99}
            radius={40}
            transform={{ translate: [200, 200] }}
          />
        ))}
        </Chord>
      </Svg>
    </div>
  );
};

export default Bubbles;
/*<Svg width={400} height={400}>
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
                if (i < colors.length) {
                  return (
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                    />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>*/