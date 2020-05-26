import { ContactAction } from '../actions/contactAction';
export const CONTACT_SUBMIT = 'SUBMIT_CONTACT' as const;
export const CONTACT_RESET = 'RESET_CONTACT' as const;

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
    case CONTACT_SUBMIT:
      return {
        ...state,
        mail: action.payload.mail,
        message: action.payload.message,
      };
  }
  return state;
};
export default contactReducer;
