import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const password = group.get('password')?.value?.target?.value;
  const confirmPassword = group.get('confirm')?.value?.target?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
};
