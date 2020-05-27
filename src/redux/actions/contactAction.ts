import { submitContact } from '../../modules/models/Contact';
import { CONTACT_INPUT } from '../reducers/contactInfoReducer';

export type ContactAction = {
  type: string;
  payload: {
    mail: string;
    message: string;
  };
};

export const submitContactAction = (mail: string, message: string) => {
  return async (dispatch: Function) => {
    await submitContact({ mail, message });
    dispatch({
      type: CONTACT_INPUT,
      payload: {
        mail: '',
        message: '',
      },
    });
  };
};
