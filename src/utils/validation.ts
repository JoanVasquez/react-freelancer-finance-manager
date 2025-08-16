export type ValidationRules<ValueType> = {
  required?: boolean
  minLength?: ValueType extends string ? number : never
  pattern?: ValueType extends string ? RegExp : never
  custom?: (value: ValueType) => string | null
}

export type ValidationSchema<T extends Record<string, unknown>> = {
  [K in keyof T]: ValidationRules<T[K]>
}

export function validateInputs<T extends Record<string, unknown>>(
  data: T,
  schema: ValidationSchema<T>,
): { valid: boolean; errors: Partial<Record<keyof T, string>> } {
  let valid = true
  const errors: Record<string, string> = {} // usamos string keys mutables internamente

  ;(Object.keys(schema) as Array<keyof T>).forEach((key) => {
    const rules = schema[key]
    const value = data[key]

    // Required
    if (rules.required && (!value || String(value).trim() === '')) {
      // errors[String(key)] = `${String(key)} is required`
      errors[String(key)] = 'This field is required'
      valid = false
      return
    }

    // Min length
    if (
      rules.minLength &&
      typeof value === 'string' &&
      value.length < rules.minLength
    ) {
      // errors[String(key)] = `${String(
      //   key,
      // )} must be at least ${rules.minLength} characters`
      errors[String(key)] =
        `This field must be at least ${rules.minLength} characters`
      valid = false
    }

    // Pattern
    if (
      rules.pattern &&
      typeof value === 'string' &&
      !rules.pattern.test(value)
    ) {
      errors[String(key)] = `Invalid ${String(key)} format`
      valid = false
    }

    // Custom validator
    if (rules.custom) {
      const customError = rules.custom(value)
      if (customError) {
        errors[String(key)] = customError
        valid = false
      }
    }
  })

  return { valid, errors: errors as Partial<Record<keyof T, string>> }
}
