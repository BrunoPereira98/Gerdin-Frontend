import { createFeatureSelector } from '@ngrx/store';
import { AngularSettings } from '../models/angular-settings';

export const angularSettingSelector = createFeatureSelector<AngularSettings>('angularSetting');
