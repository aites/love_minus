import { submitContact } from '../../modules/models/Contact';

export type ContactAction = {
  type: string;
  payload: {
    name: string;
    mail: string;
    message: string;
  };
};

export const submitContactAction = (name: string, mail: string, message: string) => {
  return async () => {
    await submitContact({ name, mail, message });
    return {
      type: 'SUBMIT_CONTACT',
      payload: {
        name,
        mail,
        message,
      },
    };
  };
};
