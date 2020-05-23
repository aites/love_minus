import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { submitContactAction } from '../redux/actions/contactAction';
import { RootStateProps } from '../redux/reducers';

import classes from './contactMail.module.scss';

type State = {
  name: string;
  mail: string;
  message: string;
};

type Props = {
  handleClick: Function;
};

class ContactForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      mail: '',
      message: '',
    };
  }
  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.props.handleClick(this.state);
    this.setState({ name: '', mail: '', message: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          name="name"
          label="お名前"
          type="text"
          required
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          fullWidth
          className={classes.input}
        />
        <TextField
          name="mail"
          label="メールアドレス"
          type="mail"
          required
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
    );
  }
}

function mapStateToProps(state: RootStateProps) {
  return state;
}

function mapDispatchToProps(dispatch: Function) {
  return {
    handleClick: (info: State) => {
      dispatch(submitContactAction(info.name, info.mail, info.message));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
