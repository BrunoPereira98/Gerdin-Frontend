import { createReducer, on } from '@ngrx/store';
import { TesteComunicacao } from '../models/teste-comunicacao';
import { testeComunicacaoAPISuccess } from './teste-comunicacao.actions';

export const initialState: TesteComunicacao = {
  testeComunicacao: '',
};

export const testeComunicacaoReducer = createReducer(
  initialState,

  on(testeComunicacaoAPISuccess, (state, { testeComunicacao }) => {
    state = {
      ...state,
      testeComunicacao: testeComunicacao.toString(),
    };

    return state;
  })
);
