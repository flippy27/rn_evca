import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MapIcon(props) {
  return (
    <Svg
      width={19}
      height={43}
      viewBox="0 0 19 43"
      fill={props.fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.058 13.1l-6.17-.09L15.81 0H6.318L.306 18.452c-.896 2.75.282 6.091 2.145 6.091h5.537l-3.463 16.53c-.316 1.478.826 2.632 1.441 1.42L18.5 18.57c1.125-2.1.229-5.44-1.441-5.47z"
        fill={props.fill}
      />
    </Svg>
  )
}

export default MapIcon