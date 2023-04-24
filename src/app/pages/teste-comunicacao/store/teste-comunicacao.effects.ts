import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { TesteComunicacaoService } from '../services/teste-comunicacao.service';
import {
  testeComunicacaoAPISuccess,
  testeComunicacaoApi,
} from './teste-comunicacao.actions';
import { testeComunicacaoSelector } from './teste-comunicacao.selectors';

@Injectable()
export class TesteComunicacaoEffect {
  constructor(
    private actions$: Actions,
    private testeComunicacaoService: TesteComunicacaoService,
    private store: Store
  ) {}

  loadTesteComunicacao$ = createEffect(() =>
    this.actions$.pipe(
      ofType(testeComunicacaoApi),
      withLatestFrom(this.store.pipe(select(testeComunicacaoSelector))),
      mergeMap((testeComunicacaoStore) => {
        if (!testeComunicacaoStore) {
          return EMPTY;
        }

        return this.testeComunicacaoService
          .get()
          .pipe(
            map((data) =>
              testeComunicacaoAPISuccess({ testeComunicacao: data })
            )
          );
      })
    )
  );
}
