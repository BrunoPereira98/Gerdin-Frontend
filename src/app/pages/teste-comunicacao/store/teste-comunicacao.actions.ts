import { createAction, props } from '@ngrx/store';
import { TesteComunicacao } from '../models/teste-comunicacao'

export const testeComunicacaoApi = createAction('[TesteComunicacao API] Invoke Fetch API');

export const testeComunicacaoAPISuccess = createAction(
    '[TesteComunicacao API] Fetch API Success',
    props<{ testeComunicacao: TesteComunicacao }>()
);
