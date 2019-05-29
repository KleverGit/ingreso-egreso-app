import { UserModel } from './user.model';
import { Action } from '@ngrx/store';

export const SET_USER = '[Auth] set user';
export const DELETE_USER = '[Auth] delete user';

export class SetUserAction implements Action {
    readonly type = SET_USER;
    constructor(public user: UserModel) {
    }
}

export class DeleteUserAction implements Action {
    readonly type = DELETE_USER;
}

export type authActions = SetUserAction | DeleteUserAction;
