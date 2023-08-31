import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function CreditCard(props) {
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G fill={props.fill}>
        <Path d="M0 8.5a4.25 4.25 0 014.25-4.25h25.5A4.25 4.25 0 0134 8.5v2.125H0V8.5z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 14.875V25.5a4.25 4.25 0 004.25 4.25h25.5A4.25 4.25 0 0034 25.5V14.875H0zm6.375 4.25A2.125 2.125 0 004.25 21.25v2.125A2.125 2.125 0 006.375 25.5H8.5a2.125 2.125 0 002.125-2.125V21.25A2.125 2.125 0 008.5 19.125H6.375z"
        />
      </G>
    </Svg>
  )
}

export default CreditCard
