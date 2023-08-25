import React from "react";
import { Image, View } from "react-native";
import LogoDhemax from "../components/icons/logo_dhemax";
import LogoCopec from "../components/icons/logo_copec";
import { Colors } from "../configs/common";

export const LogoSVG = ({ width, height }) => {
  return <LogoDhemax width={width} height={height}/>;
  let renderBasedOnLogo = () => {
    if (Colors.COMPANY.COMPANY_LOGO == "dhemax") {
      return <LogoDhemax />;
    } else if (Colors.COMPANY.COMPANY_LOGO == "copec") {
      return <LogoCopec />;
    } else {
      return <LogoDhemax />;
    }
  };

  return <View>{renderBasedOnLogo()}</View>;
};
