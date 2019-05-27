import { UserModel } from './user.model';
import { Action } from '@ngrx/store';

export const SET_USER = '[Auth] set user';

export class SetUserAction implements Action {
    readonly type = SET_USER;
    constructor(public user: UserModel) {
    }
}

export type authActions = SetUserAction;
