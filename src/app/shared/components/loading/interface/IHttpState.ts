import { HttpProgressState } from '../enum/HttpProgressStateEnum';

export interface IHttpState {
    url: string;
    state: HttpProgressState;
}