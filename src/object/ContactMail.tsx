import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import classes from '../scss/object/contactMail.module.scss';

type Props = {
  sendContactMail: (email: string, message: string) => void;
};

export default function ContactMail(props: Props) {
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <div className={classes.formWrapper}>
      <div className={classes.infoText}>
        メールアドレスは任意です。ご返信が欲しい方はご記載ください。
      </div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          props.sendContactMail(mail, message);
          setMail('');
          setMessage('');
        }}
      >
        <TextField
          name="mail"
          label="メールアドレス"
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          fullWidth
          className={classes.input}
        />
        <TextField
          required
          name="content"
          label="お問い合わせ内容"
          multiline
          rows="8"
          margin="normal"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          className={classes.input}
        />
        <Button variant="contained" color="primary" type="submit" className={classes.button}>
          送　信
        </Button>
      </form>
    </div>
  );
}
