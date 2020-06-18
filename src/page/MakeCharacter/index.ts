import { connect } from 'react-redux';
import MakeCharacter from './MakeCharacter';
import { Character } from '../../modules/models/Character';
import {
  selectCharacter,
  makeCharacterActions,
  inputData,
  InputDataType,
} from '../../redux/reducers/makeCharacterReducer';
import { Dispatch } from 'redux';
import { RootStateProps } from '../../redux/reducers';

const mapStateToProps = (state: RootStateProps) => {
  return {
    ...state.makeCharacter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<makeCharacterActions>) => {
  return {
    selectCharacter: (character: Character) => {
      dispatch(selectCharacter(character));
    },
    inputData: (data: InputDataType) => {
      dispatch(inputData(data));
    },
  };
};

export type MakeCharacterComponentProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(MakeCharacter);
