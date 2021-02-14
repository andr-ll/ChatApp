import { LoginUserAction, CreateUserAction, UserLogoutAction, UserNewRoomAction } from "../actions/user";
const initioalState = {
    userName: '',
    userData: {},
}

export const userReducer = (
    state = initioalState,
    action
) => {
    switch(action.type) {
        case LoginUserAction:
            return Object.assign({}, state, { userName: action.payload } );
        case CreateUserAction:
            return Object.assign({}, state, { userData: action.payload });
        case UserLogoutAction:
            return Object.assign({}, state, { userData: {}, userName: '' });
        case UserNewRoomAction:
            return Object.assign({}, state, { userData: action.payload })
    }
    return state;
}