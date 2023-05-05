export interface BaseResult<T> {
    content : T;
    warnings : Warning[];
    errors: Errors[];
    messages: ValidationFailure
}

export interface ValidationFailure {
    PropertyName: string;
    ErrorMessage: string;
    AttemptedValue: any;
    CustomState: any;
    Severity: number;
    ErrorCode: string;
    FormattedMessagePlaceholderValues: any;
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