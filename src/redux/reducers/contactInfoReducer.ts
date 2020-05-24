import { ContactAction } from '../actions/contactAction';
export const CONTACT_SUBMIT = 'SUBMIT_CONTACT' as const;

export type ContactInfoProps = {
  name: string;
  mail: string;
  messages: string;
};

const initialState: ContactInfoProps = {
  name: '',
  mail: '',
  messages: '',
};

const contactReducer = (state: ContactInfoProps = initialState, action: ContactAction) => {
  switch (action.type) {
    case CONTACT_SUBMIT:
      return {
        ...state,
        mail: action.payload.mail,
        messages: action.payload.message,
      };
  }
  return state;
};
export default contactReducer;
