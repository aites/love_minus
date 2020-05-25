import { DeviceAction } from '../actions/deviceAction';

export type DeviceProps = {
  device: string;
};
const initialState: DeviceProps = {
  device: 'pc',
};
const deviceReducer = (state: DeviceProps = initialState, action: DeviceAction) => {
  switch (action.type) {
    case 'SET_DEVICE_TYPE':
      return {
        ...state,
        device: action.payload.device,
      };
    default:
      return state;
  }
};
export default deviceReducer;
