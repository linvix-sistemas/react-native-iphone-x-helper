import { Dimensions, Platform, StatusBar, NativeModules } from "react-native";

const { StatusBarManager } = NativeModules;

const DEVICE_LAYOUT_MAX_VALUES = {
  780: "iPhone", // i dont now
  812: "iPhoneX", // x, 11pro
  896: "iPhoneXMax", // 11, 11max
  844: "iPhone12", // 12, 13, 14, 13pro
  926: "iPhone12Max", // 12max, 13max
  852: "iPhone14Pro", // 14 pro
  932: "iPhone14ProMax", // 14max
};

const TARGET_IPHONE_OFFSET_HEIGHT = {
  iPhone: 34,
  iPhoneX: 44,
  iPhoneXMax: 44,
  iPhone12: 47,
  iPhone12Max: 47,
  iPhone14Pro: 59,
  iPhone14ProMax: 59,
};

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
  const dimen = Dimensions.get("window");

  const iPhoneTypeW = DEVICE_LAYOUT_MAX_VALUES?.[dimen.width] ?? null;
  const iPhoneTypeH = DEVICE_LAYOUT_MAX_VALUES?.[dimen.height] ?? null;

  const iPhoneHeight = TARGET_IPHONE_OFFSET_HEIGHT[iPhoneTypeW ?? iPhoneTypeH] ?? 34;

  return Platform.select({
    ios: iPhoneHeight,
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getAsyncStatusBarHeight() {
  return new Promise((res, rej) => {
    if (StatusBarManager && StatusBarManager.getHeight) {
      return StatusBarManager.getHeight(({ height }) => {
        res(height);
      });
    } else {
      res(StatusBar.currentHeight);
    }
  });
}

export function getBottomSpace(fallback = 0) {
  return isIphoneX() ? 34 : fallback;
}
