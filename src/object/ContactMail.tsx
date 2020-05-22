import React, { Component } from 'react';
import { MouseEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const firebase = require('firebase');
require('firebase/functions');

type State = {
  name: string;
  email: string;
  contents: string;
};

class ContactForm extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: '',
      email: '',
      contents: '',
    };
  }
  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    let sendMail = firebase.functions().httpsCallable('sendMail');
    sendMail(this.state);
    this.setState({ name: '', email: '', contents: '' });
  };

  render() {
    return (
      <div>
        <h2>お問い合わせ</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="name"
            label="お名前"
            type="text"
            required
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <TextField
            name="email"
            label="メールアドレス"
            type="mail"
            required
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <TextField
            required
            name="content"
            label="お問い合わせ内容"
            multiline
            rows="8"
            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ contents: e.target.value })}
          />
          <Button variant="contained" color="primary" type="submit">
            送信
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
