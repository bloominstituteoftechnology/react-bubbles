import React, { useState, useEffect } from "react";
import { Cluster } from "@potion/layout";
import { Svg, Circle, Group } from "@potion/element";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <p>Bubbles</p>
      <Svg width={400} height={400}>
        <Group transform={{ translate: [40, 80] }}>
          <Cluster
            data={{
              children: bubbleData
            }}
            size={[400, 320]}
            nodeEnter={d => ({ ...d, x: 200, y: 200 })}
            animate
          >
            {nodes => nodes.map(({ key, x, y }, i) => {
              if (i < colors.length) {
                  return (
                      <Circle
                          key={key}
                          cx={y}
                          cy={x}
                          r={10}
                          fill={colors[i].code.hex}
                      />
                      );
                    }
                  return null;
                  })
                  .filter(v => v)
                }
              </Cluster>
        </Group>
      </Svg>
    </div>
  );
};

export default Bubbles;
