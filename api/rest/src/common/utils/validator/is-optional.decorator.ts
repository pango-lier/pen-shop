import {
  ValidateIf,
  ValidationOptions,
  IsOptional as IsOptionalValidator,
} from 'class-validator';

export function IsOptionalEx(
  nullable = false,
  validationOptions?: ValidationOptions,
) {
  if (nullable) {
    return IsOptionalValidator(validationOptions);
  }

  return ValidateIf((ob: any, v: any) => {
    return v !== undefined;
  }, validationOptions);
}
