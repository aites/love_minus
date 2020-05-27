import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { submitContactAction } from '../redux/actions/contactAction';
import { RootStateProps } from '../redux/reducers';

import classes from './contactMail.module.scss';
import { CONTACT_INPUT } from '../redux/reducers/contactInfoReducer';

type Props = {
  handleClick: (email: string, message: string) => void;
  handleChange: (email: string, message: string) => void;
  mail: string;
  message: string;
};

class ContactForm extends Component<Props> {
  render() {
    return (
      <div className={classes.formWrapper}>
        <div className={classes.infoText}>
          メールアドレスは任意です。ご返信が欲しい方はご記載ください。
        </div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            this.props.handleClick(this.props.mail, this.props.message);
          }}
        >
          <TextField
            name="mail"
            label="メールアドレス"
            type="email"
            value={this.props.mail}
            onChange={(e) => this.props.handleChange(e.target.value, this.props.message)}
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
            value={this.props.message}
            onChange={(e) => this.props.handleChange(this.props.mail, e.target.value)}
            fullWidth
            className={classes.input}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{
              margin: 'auto',
              display: 'block',
              width: '33%',
            }}
          >
            送　信
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: RootStateProps) {
  return {
    mail: state.contactInfo.mail,
    message: state.contactInfo.message,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    handleChange: (mail: string, message: string) => {
      dispatch({
        type: CONTACT_INPUT,
        payload: {
          mail,
          message,
        },
      });
    },
    handleClick: (mail: string, message: string) => {
      dispatch(submitContactAction(mail, message));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
