type DeviceActionType = 'SET_DEVICE_TYPE';
export type DeviceAction = {
  type: DeviceActionType;
  payload: {
    device: string;
  };
};
export const setDeviceType = (device: string) => ({
  type: 'SET_DEVICE_TYPE',
  payload: { device },
});

type DeviceType = 'pc' | 'sp' | 'tab';
/** UserAgentからデバイスを判定する */
export const setUserAgentAction = (ua: string) => (dispatch: Function) => {
  ua = ua.toLowerCase();
  let device: DeviceType = 'pc';
  if (
    ua.indexOf('iphone') > 0 ||
    ua.indexOf('ipod') > 0 ||
    (ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0)
  ) {
    device = 'sp';
  } else if (ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0) {
    // iOS12 まで
    device = 'tab';
  } else if (
    ua.indexOf('ipad') > -1 ||
    (ua.indexOf('macintosh') > -1 && 'ontouchend' in document)
  ) {
    // iOS13 以降
    device = 'tab';
  } else {
    device = 'pc';
  }
  console.log(ua, device);
  dispatch({ type: 'SET_DEVICE_TYPE', payload: { device } });
};
