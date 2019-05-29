import * as fromAuth from './auth.actions';
import { UserModel } from './user.model';

export interface AuthState {
    user: UserModel;
}

const initState: AuthState = {
    user: null
};

export function authReducer(state: AuthState = initState, action: fromAuth.authActions): AuthState {
    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: {
                    ...action.user
                }
            };
        case fromAuth.DELETE_USER:
            return {
                user: null
            };
        default:
            break;
    }
}

