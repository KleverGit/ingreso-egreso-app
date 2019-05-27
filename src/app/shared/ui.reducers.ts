import * as fromUI from './ui.actions';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
};

export function uiReducer(state: State = initState, action: fromUI.acciones) {
    switch (action.type) {
        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading: true
            };
        case fromUI.ACTIVAR_LOADING:
            return {
                isLoading: false
            };
        default:
            return initState;
    }
}
