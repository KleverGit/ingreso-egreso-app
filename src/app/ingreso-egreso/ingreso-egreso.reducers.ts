import * as fromIngresoegresoActions from './ingreso-egreso.actions';
import { IngresoEgresoModel } from './ingreso-egreso.model';

// Interface de state inicial
export interface IngresoEgresoState {
    items: IngresoEgresoModel[];
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

