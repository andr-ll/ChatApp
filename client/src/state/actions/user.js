export const LoginUserAction = "LoginUser";
export const CreateUserAction = "CreateUser";
export const UserLogoutAction = "UserLogout";
export const UserNewRoomAction = "ChangeRoom";

export const loginUser = (userName) => {
    return {
        type: LoginUserAction,
        payload: userName
    }
}

export const createUser = (userData) => {
    return {
        type: CreateUserAction,
        payload: userData
    }
}

export const userChangeRoom = (user) => {
    return {
        type: UserNewRoomAction,
        payload: user
    }
}

export const userLogout = () => {
    return {
        type: UserLogoutAction,
        payload: undefined
    }
}