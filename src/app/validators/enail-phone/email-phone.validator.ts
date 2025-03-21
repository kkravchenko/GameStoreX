import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailOrPhoneValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) return { required: true };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  const isEmail = emailRegex.test(value.target.value);
  const isPhone = phoneRegex.test(value.target.value);

  if (isEmail || isPhone) {
    return null;
  }

  return { emailOrPhoneInvalid: true };
}
