import { ref, watchEffect, toValue } from "vue"
import type { Ref, Reactive } from "vue"
import type { Rule, Rules } from "../Types"

interface Result {
  isValid: Ref<boolean>,
  inputs: Ref<ResultInput>
}

interface ResultInput {
  [key: string]: ResultInputItem
}
interface ResultInputItem {
  valid: boolean
  errors: string[]
}

export function useVuelidator(input: Ref | Reactive<any>, rules: Rules): Result {
  const isValid: Ref<boolean> = ref(true)
  const inputs: Ref<ResultInput> = ref({})

  const validate = (value: any, rule: Rule) => {
    let result = {
      valid: true as boolean,
      errors: [] as string[]
    }

    for (const [ruleName, ruleValue] of Object.entries(rule)) {
      if (ruleName === "required") {
        if (!value) {
          result.valid = false
          result.errors.push("Field required")
        }
      } else if (ruleName === "maxChars") {
        if (String(value).length > ruleValue) {
          result.valid = false
          result.errors.push("More characters than expected")
        }
      } else if (ruleName === "minChars") {
        if (String(value).length < ruleValue) {
          result.valid = false
          result.errors.push("Less characters than expected")
        }
      } else if (ruleName === "regexp") {
        if (!ruleValue.test(value)) {
          result.valid = false
          result.errors.push("RegExp error")
        }
      }
    }

    return result
  }


  const runValidator = () => {
    // Reset values
    isValid.value = true
    inputs.value = {}

    let inputValue = toValue(input)

    for (const [ruleName, inputValueItemValue] of Object.entries(rules)) {
      let errors: string[] = []
      const inputToValidate = inputValue[ruleName]
      const validationResult = validate(inputToValidate, inputValueItemValue)

      if (!validationResult.valid) isValid.value = false
      errors.push(...validationResult.errors)

      inputs.value[ruleName] = {
        valid: validationResult.valid,
        errors,
      }
    }
  }


  watchEffect(() => {
    runValidator()
  })

  return { isValid, inputs }
}