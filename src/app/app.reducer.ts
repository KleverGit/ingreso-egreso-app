import * as fromui from './shared/ui.reducers';
import * as fromauth from './auth/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromui.State;
    auth: fromauth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    ui: fromui.uiReducer,
    auth: fromauth.authReducer
};

