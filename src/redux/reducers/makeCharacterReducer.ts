import { Character, characterList } from '../../modules/models/Character';

export const SELECT_CHARACTER = 'MAKE_CHARACTER/SELECT_CHARACTER' as const;
export const INPUT_DATA = 'MAKE_CHARACTER/INPUT_DATA' as const;

export type makeCharacterActions =
  | ReturnType<typeof selectCharacter>
  | ReturnType<typeof inputData>;

export const selectCharacter = (character: Character) => ({
  type: SELECT_CHARACTER,
  payload: { character },
});

export type InputDataType = Partial<Omit<MakeCharacterProps, 'selectedCharacter'>>;
export const inputData = (data: InputDataType) => ({
  type: INPUT_DATA,
  payload: { data },
});

export type MakeCharacterProps = {
  selectedCharacter: Character;
  name: string;
  sex: Character['sex'];
  simpleProfile: string;
  profile: string;
};

const initialState: MakeCharacterProps = {
  selectedCharacter: characterList[0],
  name: '',
  sex: characterList[0].sex,
  simpleProfile: '',
  profile: '',
};

const makeCharacterReducer = (
  state: MakeCharacterProps = initialState,
  action: makeCharacterActions
): MakeCharacterProps => {
  switch (action.type) {
    case SELECT_CHARACTER:
      return {
        ...state,
        selectedCharacter: action.payload.character,
        sex: action.payload.character.sex,
      };
    case INPUT_DATA:
      return {
        ...state,
        ...action.payload.data,
      };
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _exhaustiveCheck: never = action;
  }
  return state;
};
export default makeCharacterReducer;
