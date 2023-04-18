import { Injectable } from '@angular/core';
import { AngularSettings } from '../models/angular-settings';

@Injectable()
export class AngularSettingsStoreService {
    private store$ = 'ASStore';

    constructor () {}

    getStore(): AngularSettings {
        const as = localStorage.getItem(this.store$);

        if (!as) {
            return {} as AngularSettings;
        }

        return JSON.parse(atob(as));
    }

    addStore(as: AngularSettings) {
        localStorage.setItem(this.store$, btoa(JSON.stringify(as)));
    }

    removeStore() {
        localStorage.removeItem(this.store$);
    }
}