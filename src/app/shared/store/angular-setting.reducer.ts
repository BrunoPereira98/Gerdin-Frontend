import { createReducer, on } from '@ngrx/store';
import { AngularSettings } from '../models/angular-settings';
import { angularSettingAPISuccess } from './angular-setting.action'

export const initialState: AngularSettings = {
    federationUrl: '',
    popLoginUrl: ''
};

export const angularSettingReducer  = createReducer(
    initialState,

    on(angularSettingAPISuccess, (state, { angularSetting }) => {
        state = {
            ...state,
            ...angularSetting
        }

        return state;
    })
);
