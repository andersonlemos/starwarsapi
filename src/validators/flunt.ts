export class Flunt {
    private _errors: any[];
    constructor(public errors: any[] = []) {
        this._errors = errors;
    }

    isRequired(value, message) {
        if (!value || value.length <= 0) {
            this._errors.push(message);
        }
    }

    hasMinLen = (value, min, message) => {
        if (!value || value.length < min) {
            this._errors.push(message);
        }
    };

    hasMaxLen = (value, max, message) => {
        if (!value || value.length > max) {
            this._errors.push(message);
        }
    };

    isFixedLen = (value, len, message) => {
        if (value.length !== len) {
            this._errors.push(message);
        }
    };

    isEmail = (value, message) => {
        const reg = new RegExp(
            /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        );
        if (!reg.test(value)) {
            this._errors.push(message);
        }
    };

    isNotNull = (value, message) => {
        if (!value.length) {
            this._errors.push(message);
        }
    };

    isGreaterThan = (valuea, valueb, message) => {
        if (valuea > valueb) {
            this._errors.push(message);
        }
    };

    clear() {
        this._errors = [];
    }

    isValid() {
        return this._errors.length === 0;
    }
}
