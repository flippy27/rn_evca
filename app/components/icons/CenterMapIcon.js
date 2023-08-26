import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function CenterMapIcon(props) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M0 14h28M14 0v28" stroke="#1C355E" strokeWidth={2} />
      <Circle
        cx={14.0001}
        cy={14.0001}
        r={11.0909}
        fill="#fff"
        stroke="#1C355E"
        strokeWidth={2}
      />
      <Circle
        cx={5.72727}
        cy={5.72727}
        r={5.72727}
        transform="matrix(-1 0 0 1 19.727 8.273)"
        fill="#1C355E"
      />
    </Svg>
  )
}

export default CenterMapIcon
