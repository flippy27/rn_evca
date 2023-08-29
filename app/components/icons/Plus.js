import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { Colors } from "../../configs/common";

function Plus({ fill = Colors.COMPANY.PRIMARY_DARK, height = "26", width = "26", ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      height={height}
      width={width}
      {...props}
    >
      <G data-name="Layer 51">
        <Path 
          d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm0 26a12 12 0 1112-12 12 12 0 01-12 12z" 
          fill={fill}
        />
        <Path 
          d="M17 15V8a1 1 0 00-2 0v7H8a1 1 0 000 2h7v7a1 1 0 002 0v-7h7a1 1 0 000-2z" 
          fill={fill}
        />
      </G>
    </Svg>
  );
}

export default Plus;