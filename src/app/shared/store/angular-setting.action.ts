import { createAction, props } from '@ngrx/store';
import { AngularSettings } from '../models/angular-settings';

export const angularSettingApi = createAction('[AngularSetting API] Invoke Fetch API');

export const angularSettingAPISuccess = createAction(
    '[AngularSetting API] Fetch API Success',
    props<{ angularSetting: AngularSettings }>()
);
