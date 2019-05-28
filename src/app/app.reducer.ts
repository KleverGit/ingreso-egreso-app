import * as fromui from './shared/ui.reducers';
import * as fromauth from './auth/auth.reducers';
import * as fromingresoegreso from './ingreso-egreso/ingreso-egreso.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromui.State;
    auth: fromauth.AuthState;
    ingresoEgreso: fromingresoegreso.IngresoEgresoState;
}

export const reducers: ActionReducerMap<AppState> = {
    ui: fromui.uiReducer,
    auth: fromauth.authReducer,
    ingresoEgreso: fromingresoegreso.ingresoEgresoReducer
};

