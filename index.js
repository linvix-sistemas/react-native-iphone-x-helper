import { Dimensions, Platform, StatusBar, NativeModules } from "react-native";

const { StatusBarManager } = NativeModules;

export function isIphoneX() {
  const dimen = Dimensions.get("window");

  const resolutions =
    // i dont now
    [dimen.height, dimen.width].includes(780) ||
    // x, 11pro
    [dimen.height, dimen.width].includes(812) ||
    // 12, 13, 14, 13pro
    [dimen.height, dimen.width].includes(844) ||
    // 14 pro
    [dimen.height, dimen.width].includes(852) ||
    // 11, 11max
    [dimen.height, dimen.width].includes(896) ||
    // 12max, 13max
    [dimen.height, dimen.width].includes(926) ||
    // 14max
    [dimen.height, dimen.width].includes(932);

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

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
