import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class UserStoreService {
    private store$ = 'UStore';

    constructor () {}

    getStore(): User {
        const user = localStorage.getItem(this.store$);

        if (!user) {
            return {} as User;
        }

        return JSON.parse(atob(user));
    }

    addStore(user: User) {
        localStorage.setItem(this.store$, btoa(JSON.stringify(user)));
    }

    removeStore() {
        localStorage.removeItem(this.store$);
    }
}
