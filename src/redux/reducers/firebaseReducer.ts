type Actions = any;

export type AppStateProps = {
  user: firebase.User | null;
};

export const CHANGE_USER = 'CHANGE_USER' as const;

const initialState: AppStateProps = { user: null };

const firebaseReducer = (state: AppStateProps = initialState, action: Actions) => {
  switch (action.type) {
    case CHANGE_USER:
      return {
        ...state,
        user: action.user,
      };
  }
  return state;
};
export default firebaseReducer;
