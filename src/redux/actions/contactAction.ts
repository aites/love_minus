import { submitContact } from '../../modules/models/Contact';

export type ContactAction = {
  type: string;
  payload: {
    mail: string;
    message: string;
  };
};

export const submitContactAction = (mail: string, message: string) => {
  return async () => {
    await submitContact({ mail, message });
    return {
      type: 'SUBMIT_CONTACT',
      payload: {
        mail,
        message,
      },
    };
  };
};
