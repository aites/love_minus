import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { submitContactAction } from '../redux/actions/contactAction';
import { RootStateProps } from '../redux/reducers';

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
      <div>
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
            name="mail"
            label="メールアドレス"
            type="mail"
            required
            onChange={(e) => this.setState({ mail: e.target.value })}
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
          />
          <Button variant="contained" color="primary" type="submit">
            送信
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
      dispatch(submitContactAction(info.name, info.mail, info.message));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
