import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { AngularSettingsService } from '../services/angular-settings.service';
import { angularSettingAPISuccess, angularSettingApi } from './angular-setting.action';
import { angularSettingSelector } from './angular-setting.selector';

@Injectable()
export class AngularSettingEffect {
    constructor (
        private actions$: Actions,
        private angularSettingService$: AngularSettingsService,
        private store: Store
    ) {}

    loadTesteComunicacao$ = createEffect(() => 
        this.actions$.pipe(
            ofType(angularSettingApi),
            withLatestFrom(this.store.pipe(select(angularSettingSelector))),
            mergeMap((angularSettingStore) => {
                if (!angularSettingStore) {
                    return EMPTY;
                }

                return this.angularSettingService$
                    .getConfigsPop()
                    .pipe(map((data) => angularSettingAPISuccess({ angularSetting: data })));
            })
        )
    );
}
