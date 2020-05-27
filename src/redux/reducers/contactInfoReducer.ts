import { ContactAction } from '../actions/contactAction';
export const CONTACT_INPUT = 'CONTACT_INPUT' as const;

export type ContactInfoProps = {
  mail: string;
  message: string;
};

const initialState: ContactInfoProps = {
  mail: '',
  message: '',
};

const contactReducer = (state: ContactInfoProps = initialState, action: ContactAction) => {
  switch (action.type) {
    case CONTACT_INPUT:
      return {
        ...state,
        mail: action.payload.mail,
        message: action.payload.message,
      };
  }
  return state;
};
export default contactReducer;
