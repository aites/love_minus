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
  if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
    // 物理サイズがスマートフォン
    device = 'sp';
  } else {
    if (window.innerWidth <= 640) {
      // 画面サイズがスマートフォン(導入するか検討)
      device = 'sp';
    }
  }
  dispatch({ type: 'SET_DEVICE_TYPE', payload: { device } });
};
