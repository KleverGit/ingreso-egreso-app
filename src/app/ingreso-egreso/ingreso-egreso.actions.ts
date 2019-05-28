import { Action } from '@ngrx/store';
import { IngresoEgresoModel } from './ingreso-egreso.model';

export const SET_ITEMS = '[INGRESO EGRESO] SetItems';
export const DELETE_ITEMS = '[INGRESO EGRESO] DeleteItems';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;

    constructor(public items: IngresoEgresoModel[]) {
    }

}

export class DeleteItemsAction implements Action {
    readonly type = DELETE_ITEMS;
}

export type itemsActions = SetItemsAction | DeleteItemsAction;
