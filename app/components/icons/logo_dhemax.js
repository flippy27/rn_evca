import * as React from "react";
import Svg, {
  Path,
  Mask,
  G,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

function LogoDhemax(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 155 184"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M27.132 44.96H1.585c-.266.001-.527.077-.753.22-.227.142-.41.346-.529.589a1.485 1.485 0 00.133 1.529l41.201 56.064a1.483 1.483 0 010 1.752L.431 161.117a1.478 1.478 0 00.392 2.118c.226.143.487.219.753.219l25.502.047a5.102 5.102 0 002.322-.556 5.203 5.203 0 001.83-1.558l40.31-54.932a3.74 3.74 0 00.72-2.209 3.74 3.74 0 00-.72-2.209L31.278 47.079a5.2 5.2 0 00-1.827-1.558 5.1 5.1 0 00-2.319-.56z"
        fill="#1B355E"
      />
      <Mask
        id="a"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={79}
        y={0}
        width={76}
        height={184}
      >
        <Path
          d="M87.293 106.079c-10.55 15.314-9.872 35.428 1.686 50.072l17.473 21.748a16.427 16.427 0 004.951 4.107 16.096 16.096 0 0012.471 1.204 16.292 16.292 0 005.622-3.086 16.625 16.625 0 004.033-5.041 16.883 16.883 0 001.832-6.229 16.96 16.96 0 00-.649-6.469 16.749 16.749 0 00-3.031-5.723l-43.099-52.443h-.008l-1.281 1.86zm37.971-98.97L89.268 52.776c-11.332 14.411-12.128 34.31-1.986 49.517l1.286 1.925h.008l61.77-76.397c4.908-6.097 5.002-14.787-.284-21.249a14.967 14.967 0 00-6.32-4.55 16.966 16.966 0 00-5.886-1.078c-2.42-.005-4.81.546-6.991 1.612a16.122 16.122 0 00-5.608 4.547"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M155.355.95H76.743v183.065h78.612V.949z"
          fill="url(#paint0_linear_2333_207)"
        />
      </G>
      <G>
        <Mask
          id="b"
          style={{
            maskType: "luminance",
          }}
          maskUnits="userSpaceOnUse"
          x={79}
          y={0}
          width={76}
          height={184}
        >
          <Path
            d="M125.264 7.108l-35.996 45.67c-11.332 14.41-12.127 34.31-1.985 49.516l1.285 1.925-1.277 1.86c-10.55 15.314-9.872 35.428 1.686 50.072l17.472 21.748c2.766 3.406 6.748 5.554 11.07 5.972 2.14.206 4.298-.018 6.353-.661a16.278 16.278 0 005.621-3.086 16.628 16.628 0 004.034-5.041 16.96 16.96 0 001.183-12.698 16.784 16.784 0 00-3.031-5.723l-43.103-52.443 61.774-76.397c4.909-6.097 5.003-14.787-.284-21.249a14.964 14.964 0 00-6.319-4.55 16.97 16.97 0 00-5.883-1.078 15.85 15.85 0 00-6.993 1.613 16.135 16.135 0 00-5.609 4.546"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#b)">
          <Path
            d="M151.317-16.72L37.052 10.353l43.73 191.331 114.266-27.073-43.731-191.33z"
            fill="url(#paint1_linear_2333_207)"
          />
        </G>
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_2333_207"
          x1={79.793}
          y1={92.5358}
          x2={154.004}
          y2={92.5358}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#1FBBEE" />
          <Stop offset={0.1} stopColor="#2DBDDE" />
          <Stop offset={0.29} stopColor="#50C4B5" />
          <Stop offset={0.56} stopColor="#89CE72" />
          <Stop offset={0.79} stopColor="#C1D831" />
          <Stop offset={1} stopColor="#C1D831" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_2333_207"
          x1={145.731}
          y1={215.076}
          x2={100.748}
          y2={25.2165}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#1FBBEE" />
          <Stop offset={0.1} stopColor="#2DBDDE" />
          <Stop offset={0.29} stopColor="#50C4B5" />
          <Stop offset={0.56} stopColor="#89CE72" />
          <Stop offset={0.79} stopColor="#C1D831" />
          <Stop offset={1} stopColor="#C1D831" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default LogoDhemax;
