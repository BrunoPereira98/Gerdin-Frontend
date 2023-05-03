import { Injectable } from '@angular/core';
import { IHttpState } from '../interface/IHttpState';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    public state = new BehaviorSubject<IHttpState>({} as IHttpState);

    constructor() { }
}