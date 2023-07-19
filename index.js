import { Dimensions, Platform, StatusBar, NativeModules } from "react-native";

const { StatusBarManager } = NativeModules;

const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_X_HEIGHT = 44;
const STATUSBAR_IP12_HEIGHT = 47;
const STATUSBAR_IP12MAX_HEIGHT = 47;
const STATUSBAR_IP14PRO_HEIGHT = 49;

// const X_WIDTH = 375;
// const X_HEIGHT = 812;

// const XSMAX_WIDTH = 414;
// const XSMAX_HEIGHT = 896;

// const IP12_WIDTH = 390;
// const IP12_HEIGHT = 844;

// const IP12MAX_WIDTH = 428;
// const IP12MAX_HEIGHT = 926;

// const IP14PRO_WIDTH = 393;
// const IP14PRO_HEIGHT = 852;

// const IP14PROMAX_WIDTH = 430;
// const IP14PROMAX_HEIGHT = 932;

export function isIphoneX() {
  const dimen = Dimensions.get("window");

  const res_arr = [dimen.height, dimen.width];

  const resolutions =
    // i dont now
    res_arr.includes(780) ||
    // x, 11pro
    res_arr.includes(812) ||
    // 12, 13, 14, 13pro
    res_arr.includes(844) ||
    // 14 pro
    res_arr.includes(852) ||
    // 11, 11max
    res_arr.includes(896) ||
    // 12max, 13max
    res_arr.includes(926) ||
    // 14max
    res_arr.includes(932);

  return Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS && resolutions;
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight() {
  return Platform.select({
    ios: StatusBarManager.HEIGHT,
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getBottomSpace(fallback = 0) {
  return isIphoneX() ? 34 : fallback;
}
