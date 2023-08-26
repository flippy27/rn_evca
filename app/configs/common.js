import CCS1 from "../components/icons/CCS1";
import CCS2 from "../components/icons/CCS2";
import GBT_DC from "../components/icons/GBT_DC";
import Tipo1 from "../components/icons/Tipo1";
import Tipo2 from "../components/icons/Tipo2";
import { COMPANY } from "./global";

//COLORS

const COMPANY_COLORS = () => {
  let com_col;
  if (COMPANY == "2f9d6954-0b90-48c3-a659-62d19f5aa4a3") {
    com_col = {
      PRIMARY: "#375484",
      PRIMARY_DARK: "#1C355E",
      PRIMARY_DISABLED: "#1C355E80",

      SECONDARY: "#FFF",
      SECONDARY_DARK: "#1C355E10",
      SECONDARY_DISABLED: "#FFF",

      PRIMARY_DISABLED: "#1C355E10",

      COMPANY_LOGO: "dhemax",
    };
  } else if (COMPANY == "23ad7a11-0e23-40bc-be90-11ee80019d88") {
    com_col = {
      PRIMARY: "#FF5484",
      PRIMARY_DARK: "#FF355E",
      PRIMARY_DISABLED: "#FF355E80",

      SECONDARY: "#FFF",
      SECONDARY_DARK: "#FF355E10",
      SECONDARY_DISABLED: "#FFF",

      PRIMARY_DISABLED: "#FF355E10",

      COMPANY_LOGO: "copec",
    };
  }
  return com_col;
};

export const Colors = {
  COMPANY: COMPANY_COLORS(),
  APP: {
    LIGHT_GRAY: "#F5F5F5",
    DARK_GRAY: "#393737",
    PLACEHOLDER_LIGHT_GRAY: "#BFBFBF",
    INPUT_BACKGROUND: "#E5E5E5",
  },
  PIN: {
    ALL_AVAILABLE: "#2EB85E",
    SOME_AVAILABLE: "#3DAAFA",
    NONE_AVAILABLE: "#FAA220",
    UNAVAILABLE: "#FA5852",
  },
};
export const texts = {
  COMPANY: {
    WELCOME: "Hola",
  },
};

export const Connector = ({ name }) => {
  if (name == "Tipo 1") {
    return <Tipo1 />;
  } else if (name == "Tipo 2" || name == "IEC Tipo 2") {
    return <Tipo2 />;
  } else if (name == "CCS1") {
    return <CCS1 />;
  } else if (name == "CCS2") {
    return <CSS2 />;
  } else if (name == "GB/T_DC") {
    return <GBT_DC />;
  }
};
