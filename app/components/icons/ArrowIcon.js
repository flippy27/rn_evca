import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowIcon(props) {
  return (
    <Svg
      width={24}
      height={22}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.5 11c0 .794-.644 1.438-1.438 1.438H5.409l6.171 6.17a1.438 1.438 0 01-2.033 2.034L.921 12.017a1.438 1.438 0 010-2.033l8.625-8.625a1.438 1.438 0 012.033 2.032L5.408 9.562h16.654c.794 0 1.438.644 1.438 1.438z"
        fill="#1C355E"
      />
    </Svg>
  )
}

export default ArrowIcon
