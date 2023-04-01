// * ------------------------------
// *
// * Type
// *
// * ------------------------------

export interface IUserFormValues {
  name: string
  email: string
  zip: string
  prefecture: string
  address1: string
  address2?: string
}

export interface IValidationResult {
  isValid: boolean
  errors: Partial<Record<keyof IUserFormValues, string>>
}
