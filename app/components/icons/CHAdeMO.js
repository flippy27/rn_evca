import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { Colors } from "../../configs/common";

function CHAdeMO(props) {
  return (
    <Svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill={Colors.APP.DARK_GRAY}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_2213_10255)" fill="#393737">
        <Path d="M44 21.324c0-6.509-3.03-12.344-7.792-16.262l.064-.09a.75.75 0 00-.215-1.063L33.169 2.03a.805.805 0 00-1.096.21l-.069.099C29.004.849 25.602 0 22 0c-3.602 0-7.175.892-10.239 2.457l-.054-.085a.8.8 0 00-1.077-.28L7.62 3.776a.75.75 0 00-.288 1.044l.25.417C2.941 9.151 0 14.91 0 21.324c0 10.541 7.934 19.317 18.315 21.02v.892c0 .422.352.764.788.764h5.54a.776.776 0 00.788-.764v-.849c10.503-1.603 18.564-10.437 18.564-21.063H44zM22 39.802c-10.528 0-19.063-8.274-19.063-18.478C2.937 11.12 11.472 2.846 22 2.846c10.528 0 19.063 8.274 19.063 18.478 0 10.204-8.535 18.478-19.063 18.478z" />
        <Path d="M11.531 28.321c-3.852 0-6.99-3.04-6.99-6.774s3.138-6.774 6.99-6.774c3.852 0 6.99 3.04 6.99 6.774 0 3.733-3.138 6.774-6.99 6.774zm0-12.6c-3.313 0-6.01 2.614-6.01 5.826 0 3.212 2.697 5.825 6.01 5.825 3.313 0 6.01-2.613 6.01-5.825s-2.697-5.826-6.01-5.826z" />
        <Path d="M11.531 19.393c1.224 0 2.222.968 2.222 2.154s-.998 2.154-2.222 2.154-2.222-.968-2.222-2.154.998-2.154 2.222-2.154zm0-.949c-1.767 0-3.2 1.39-3.2 3.103 0 1.712 1.433 3.102 3.2 3.102 1.767 0 3.2-1.39 3.2-3.102 0-1.713-1.433-3.103-3.2-3.103zM32.684 28.321c-3.851 0-6.989-3.04-6.989-6.774s3.137-6.774 6.99-6.774c3.851 0 6.988 3.04 6.988 6.774 0 3.733-3.137 6.774-6.989 6.774zm0-12.6c-3.313 0-6.01 2.614-6.01 5.826 0 3.212 2.697 5.825 6.01 5.825 3.314 0 6.01-2.613 6.01-5.825s-2.696-5.826-6.01-5.826z" />
        <Path d="M32.684 19.393c1.224 0 2.222.968 2.222 2.154s-.998 2.154-2.222 2.154c-1.223 0-2.222-.968-2.222-2.154s.999-2.154 2.222-2.154zm0-.949c-1.767 0-3.2 1.39-3.2 3.103 0 1.712 1.433 3.102 3.2 3.102 1.767 0 3.201-1.39 3.201-3.102 0-1.713-1.434-3.103-3.2-3.103zM22 17.913c-3.808 0-6.906-3.003-6.906-6.694 0-3.69 3.098-6.689 6.906-6.689s6.901 3.003 6.901 6.69c0 3.685-3.098 6.693-6.901 6.693zm0-12.908c-3.539 0-6.416 2.79-6.416 6.214 0 3.426 2.877 6.22 6.416 6.22 3.539 0 6.412-2.79 6.412-6.22 0-3.43-2.878-6.214-6.412-6.214z" />
        <Path d="M25.695 15.356a.238.238 0 01-.176-.076l-7.425-7.562a.234.234 0 01.01-.336.252.252 0 01.348.01l7.424 7.56a.234.234 0 01-.01.338.255.255 0 01-.166.066h-.005z" />
        <Path d="M18.1 15.162a.238.238 0 01-.177-.076.234.234 0 01.01-.337l7.801-7.197a.252.252 0 01.348.01.234.234 0 01-.01.337l-7.801 7.196a.255.255 0 01-.167.067H18.1zM22 8.188a.665.665 0 00.675-.655A.665.665 0 0022 6.88a.665.665 0 00-.675.654c0 .362.302.655.675.655zM25.866 11.997a.665.665 0 00.676-.654.665.665 0 00-.676-.655.665.665 0 00-.675.655c0 .361.303.654.675.654zM21.985 15.774a.665.665 0 00.676-.655.665.665 0 00-.676-.655.665.665 0 00-.675.655c0 .361.302.655.675.655zM18.055 11.997a.665.665 0 00.676-.654.665.665 0 00-.676-.655.665.665 0 00-.675.655c0 .361.302.654.675.654zM22 38.032c-3.808 0-6.906-3.003-6.906-6.694 0-3.69 3.098-6.689 6.906-6.689s6.901 3.003 6.901 6.69c0 3.686-3.098 6.693-6.901 6.693zm0-12.908c-3.539 0-6.416 2.79-6.416 6.214 0 3.425 2.877 6.22 6.416 6.22 3.539 0 6.412-2.79 6.412-6.22 0-3.43-2.878-6.214-6.412-6.214z" />
        <Path d="M25.695 35.475a.238.238 0 01-.176-.076l-7.425-7.562a.234.234 0 01.01-.336.252.252 0 01.348.01l7.424 7.56a.234.234 0 01-.01.338.255.255 0 01-.166.066h-.005z" />
        <Path d="M18.1 35.276a.238.238 0 01-.177-.076.234.234 0 01.01-.337l7.801-7.196a.252.252 0 01.348.01.234.234 0 01-.01.336l-7.801 7.196a.255.255 0 01-.167.067H18.1zM22 28.307a.665.665 0 00.675-.655.665.665 0 00-.675-.654.665.665 0 00-.675.654c0 .362.302.655.675.655zM25.866 32.112a.665.665 0 00.676-.655.665.665 0 00-.676-.655.665.665 0 00-.675.655c0 .362.303.655.675.655zM21.985 35.893a.665.665 0 00.676-.655.665.665 0 00-.676-.655.665.665 0 00-.675.655c0 .361.302.655.675.655zM18.055 32.112a.665.665 0 00.676-.655.665.665 0 00-.676-.655.665.665 0 00-.675.655c0 .362.302.655.675.655z" />
      </G>
      <Defs>
        <ClipPath id="clip0_2213_10255">
          <Path fill="#fff" d="M0 0H44V44H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CHAdeMO;
