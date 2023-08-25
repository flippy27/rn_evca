import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function ConfigIcon(props) {
  return (
    <Svg
      width={43}
      height={43}
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_2255_14887)">
        <Path
          d="M4.23 33.32c.185-.343.3-.642.485-.89.797-1.053 1.605-2.099 2.427-3.135.214-.269.245-.478.085-.804-.314-.641-.54-1.321-.834-1.971-.067-.149-.253-.315-.407-.339-1.49-.24-2.984-.458-4.476-.674-.636-.093-.99-.427-.996-1.071-.016-1.991-.018-3.982 0-5.975.006-.65.358-.976 1.033-1.077 1.477-.222 2.955-.437 4.427-.68a.693.693 0 00.435-.337c.306-.644.589-1.302.84-1.969a.656.656 0 00-.075-.535 177.38 177.38 0 00-2.546-3.284c-.555-.702-.624-1.024-.02-1.67C5.924 7.503 7.297 6.153 8.65 4.785c.11-.113.251-.196.384-.285.622-.417.907-.413 1.505.046 1.1.844 2.2 1.684 3.281 2.55.27.218.47.263.797.099.565-.285 1.164-.504 1.758-.728.242-.09.323-.217.358-.476.206-1.479.423-2.956.674-4.429.148-.842.45-1.06 1.308-1.061 1.864-.002 3.728-.004 5.591 0 .819 0 1.119.241 1.251 1.052.243 1.488.473 2.98.684 4.476.038.266.154.367.386.454.608.23 1.215.467 1.804.742.24.112.391.085.59-.07 1.175-.901 2.36-1.787 3.542-2.678.494-.374.963-.416 1.38 0a199.605 199.605 0 014.348 4.428c.539.57.507.993.031 1.62a211.674 211.674 0 01-2.512 3.248c-.186.235-.186.419-.063.682.3.646.583 1.305.832 1.973.099.267.231.36.506.4 1.51.213 3.018.444 4.524.68.545.084.873.436.88 1.025a321.5 321.5 0 010 6.022c-.007.639-.366.961-1.009 1.056-1.492.22-2.986.439-4.476.686-.162.028-.36.194-.433.346-.3.63-.575 1.273-.822 1.928a.65.65 0 00.08.535A190.182 190.182 0 0038.4 32.43c.522.662.583 1.026.01 1.637-1.306 1.39-2.662 2.736-4 4.096-.089.09-.2.158-.302.232-.77.551-1.072.543-1.824-.05-1.066-.836-2.135-1.665-3.192-2.509-.214-.17-.381-.194-.639-.073-.602.283-1.233.504-1.835.787a.663.663 0 00-.33.423c-.242 1.457-.44 2.922-.686 4.38-.16.944-.437 1.146-1.378 1.146h-5.352c-1.082 0-1.328-.233-1.476-1.301-.19-1.37-.41-2.734-.608-4.102-.048-.325-.157-.514-.514-.62-.56-.165-1.103-.408-1.629-.665-.28-.137-.462-.133-.715.065-1.129.883-2.277 1.74-3.42 2.605-.608.461-1.019.461-1.562-.073a252.798 252.798 0 01-4.052-4.052c-.274-.283-.439-.675-.668-1.036v.002zM21.511 14.52c-3.903 0-6.992 3.094-6.99 7.004 0 3.866 3.11 6.96 6.99 6.958A6.951 6.951 0 0028.48 21.5a6.95 6.95 0 00-6.968-6.981z"
          fill={props.fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2255_14887">
          <Path fill="#fff" transform="translate(.5 .5)" d="M0 0H42V42H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ConfigIcon