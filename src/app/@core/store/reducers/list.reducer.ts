import { REDUCER_LIST } from '../reducer.constants';

export class ListReducer {
  constructor() {
  }
  static ListReducerProveedor(state: Array<any> = new Array, action) {
    switch (action.type) {
      case REDUCER_LIST.Proveedores:
        return [...state, action.payload];
      default:
        return state;
    }
  }

}