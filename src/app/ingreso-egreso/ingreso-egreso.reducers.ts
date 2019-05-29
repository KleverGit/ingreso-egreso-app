import * as fromIngresoegresoActions from './ingreso-egreso.actions';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

// Interface de state inicial
export interface IngresoEgresoState {
    items: IngresoEgresoModel[];
}

export interface AppStateIE extends AppState {
    ingresoEgreso: IngresoEgresoState;
}

// implementacion estado inical
const ingresoEgresoInicialState: IngresoEgresoState = {
    items: []
};

// reducer
export function ingresoEgresoReducer(state: IngresoEgresoState = ingresoEgresoInicialState, action: fromIngresoegresoActions.itemsActions) {
    switch (action.type) {
        case fromIngresoegresoActions.SET_ITEMS:
            //  siempre se debe destruir las relaciones de los objectos
            return {
                items: [
                    ...action.items.map(item => {
                        return { ...item };
                    })
                ]
            };
        case fromIngresoegresoActions.DELETE_ITEMS:
            return {
                items: []
            };
        default:
            return state;
    }
}

