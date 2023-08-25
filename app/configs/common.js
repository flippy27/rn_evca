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
    };
  } else if (COMPANY == "6dae7536-27c3-4c10-9a49-ff303e7d925f") {
    com_col = {
      PRIMARY: "#FF5484",
      PRIMARY_DARK: "#FF355E",
      PRIMARY_DISABLED: "#FF355E80",

      SECONDARY: "#FFF",
      SECONDARY_DARK: "#FF355E10",
      SECONDARY_DISABLED: "#FFF",

      PRIMARY_DISABLED: "#FF355E10",
    };
  }
  return com_col
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
