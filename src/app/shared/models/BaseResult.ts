export interface BaseResult<T> {
    content : T;
    warnings : Warning[];
    errors: Errors[];
}

export interface Warning {
    PropertyName : string;
    ErrorCode?: string;
    ErrorMessage: string;
}

export interface Errors {
    PropertyName : string;
    ErrorCode?: string;
    ErrorMessage: string;
}