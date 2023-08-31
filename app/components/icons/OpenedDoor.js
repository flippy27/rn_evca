import * as React from "react";
import Svg, { Path } from "react-native-svg";

function OpenedDoor(props) {
  return (
    <Svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.375 33.75a1.125 1.125 0 000 2.25h29.25a1.125 1.125 0 000-2.25H29.25V5.625a3.375 3.375 0 00-3.375-3.375H24.75V1.125A1.125 1.125 0 0023.466.011l-15.75 2.25c-.554.08-.966.554-.966 1.114V33.75H3.375zM24.75 4.5h1.125c.621 0 1.125.504 1.125 1.125V33.75h-2.25V4.5zm-5.625 18c-.621 0-1.125-1.007-1.125-2.25S18.504 18 19.125 18s1.125 1.007 1.125 2.25-.504 2.25-1.125 2.25z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default OpenedDoor;
