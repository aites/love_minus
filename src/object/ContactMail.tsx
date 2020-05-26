import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { submitContactAction } from '../redux/actions/contactAction';
import { RootStateProps } from '../redux/reducers';

import classes from './contactMail.module.scss';

type Props = {
  handleClick: Function;
};

type State = {
  mail: string;
  message: string;
};

class ContactForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mail: '',
      message: '',
    };
  }
  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.props.handleClick(this.state);
    this.setState({ mail: '', message: '' });
  };

  render() {
    return (
      <div className={classes.formWrapper}>
        <form onSubmit={this.handleSubmit}>
          <div className={classes.infoText}>
            メールアドレスは任意です。ご返信が欲しい方はご記載ください。
          </div>
          <TextField
            name="mail"
            label="メールアドレス"
            type="mail"
            value={this.state.mail}
            onChange={(e) => this.setState({ mail: e.target.value })}
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
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
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
  return state;
}

function mapDispatchToProps(dispatch: Function) {
  return {
    handleClick: (info: State) => {
      dispatch(submitContactAction(info.mail, info.message));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
