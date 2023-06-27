// Validation
interface Validatable {
  value: string;
  required?: boolean;
}

export interface ValidatableString extends Validatable {
  type: 'string';
  minLength?: number;
  maxLength?: number;
}

export interface ValidatableNumber extends Validatable {
  type: 'number';
  min?: number;
  max?: number;
}

export function validate(
  validatableInput: ValidatableString | ValidatableNumber
) {
  let isValid = true;
  console.log(validatableInput);

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.trim().length !== 0;
    if (isValid === false) {
      return isValid;
    }
  }

  if (validatableInput.type === 'string') {
    if (
      validatableInput.minLength != null &&
      validatableInput.value.trim().length !== 0
    ) {
      isValid =
        isValid && validatableInput.value.length >= validatableInput.minLength;
    }

    if (
      validatableInput.maxLength != null &&
      validatableInput.value.trim().length !== 0
    ) {
      isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
  }

  if (validatableInput.type === 'number') {
    console.log(validatableInput.value);
    if (validatableInput.min != null) {
      isValid =
        isValid && Number(validatableInput.value) >= validatableInput.min;
    }

    if (validatableInput.max != null) {
      isValid =
        isValid && Number(validatableInput.value) <= validatableInput.max;
    }
  }

  console.log(isValid);
  return isValid;
}
