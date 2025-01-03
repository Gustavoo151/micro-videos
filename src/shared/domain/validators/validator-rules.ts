export class ValidatorRules {
    static isRequired(value: any, fieldName: string): void {
        if (value === null || value === undefined || value === '') {
            throw new Error(`${fieldName} is required`);
        }
    }

    static isString(value: any, fieldName: string): void {
        if (typeof value !== 'string') {
            throw new Error(`${fieldName} must be a string`);
        }
    }

    static isNumber(value: any, fieldName: string): void {
        if (typeof value !== 'number') {
            throw new Error(`${fieldName} must be a number`);
        }
    }

    static isBoolean(value: any, fieldName: string): void {
        if (typeof value !== 'boolean') {
            throw new Error(`${fieldName} must be a boolean`);
        }
    }

    static isInRange(value: number, min: number, max: number, fieldName: string): void {
        if (value < min || value > max) {
            throw new Error(`${fieldName} must be between ${min} and ${max}`);
        }
    }

    static isEmail(value: string, fieldName: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error(`${fieldName} must be a valid email`);
        }
    }

    static maxLength(value: string, max: number, fieldName: string): void {
        if (value.length > max) {
            throw new Error(`${fieldName} must be at most ${max} characters long`);
        }
    }
}