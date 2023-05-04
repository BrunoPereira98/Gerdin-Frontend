export interface BaseResult<T> {
    content : T;
    warnings : Warning[];
    errors: Errors[];
    messages: ValidationFailureValidationFailure
}

export interface ValidationFailureValidationFailure {
    propertyName: string;
    errorMessage: string;
    attemptedValue: any;
    customState: any;
    severity: number;
    errorCode: string;
    formattedMessagePlaceholderValues: any;
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