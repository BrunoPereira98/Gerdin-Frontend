import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// https://github.com/angular/angular/blob/f00bf714110100549111bd27345943ab8830128c/packages/forms/src/validators.ts#L444-L470
export class DateValidators {
    
    static greaterThan(
        greaterThan: Date,
        convertDateToCompare: (date: Date) => Date = (date) => date
    ): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(greaterThan)) {
                return null;  // don't validate empty values to allow optional controls
            }
            let currentValue: Date = control.value;
            if (!(currentValue instanceof Date))
                currentValue = new Date(currentValue);
            const greaterThanCompare = convertDateToCompare(greaterThan);
            const currentValueCompare = convertDateToCompare(currentValue);
            if (!greaterThanCompare || !currentValueCompare) {
                return null;
            }
            if (!(currentValueCompare > greaterThanCompare)) {
                return { greaterThan: { actual: currentValueCompare, greaterThan: greaterThanCompare } };
            }
            return null;
        };
    }

    static lessThan(
        lessThan: Date,
        convertDateToCompare: (date: Date) => Date = (date) => date
    ): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(lessThan)) {
                return null;  // don't validate empty values to allow optional controls
            }
            let currentValue: Date = control.value;
            if (!(currentValue instanceof Date))
                currentValue = new Date(currentValue);
            const lessThanCompare = convertDateToCompare(lessThan);
            const currentValueCompare = convertDateToCompare(currentValue);
            if (!lessThanCompare || !currentValueCompare) {
                return null;
            }
            if (!(currentValueCompare < lessThanCompare)) {
                return { lessThan: { actual: currentValueCompare, lessThan: lessThanCompare } };
            }
            return null;
        };
    }
}

function isEmptyInputValue(value: any): boolean {
    /**
     * Check if the object is a string or array before evaluating the length attribute.
     * This avoids falsely rejecting objects that contain a custom length attribute.
     * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
     */
    return value == null ||
        ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
}