import { IAppState } from './app.state';
import { ActionReducerMap } from '@ngrx/store';
import { ListReducer } from './reducers/list.reducer';

export const rootReducer: ActionReducerMap<IAppState> = {
  // listProveedores: ListReducer.ListReducerProveedor,
  // listPlanCuentasDebito: ListReducer.ListReducerPlanCuentasDebito,
  // listPlanCuentasCredito: ListReducer.ListReducerPlanCuentasCredito,
  listPlantilla: ListReducer.ListReducerPlantilla,
};
