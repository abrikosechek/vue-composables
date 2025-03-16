import { ref, watchEffect, toValue } from "vue";
import type { Ref, Reactive } from "vue";

export interface Rules {
  [key: string]: Rule;
}

export interface Rule {
  required?: boolean;
  maxChars?: number;
  minChars?: number;
  regexp?: RegExp;
}

interface Result {
  isValid: Ref<boolean>;
  inputs: Ref<ResultInput>;
}

interface ResultInput {
  [key: string]: ResultInputItem;
}
interface ResultInputItem {
  valid: boolean;
  errors: string[];
}

export function useVuelidator(
  input: Ref | Reactive<any>,
  rules: Rules,
): Result {
  const isValid: Ref<boolean> = ref(true);
  const inputs: Ref<ResultInput> = ref({});

  const validate = (value: any, rule: Rule) => {
    let result = {
      valid: true as boolean,
      errors: [] as string[],
    };

    for (const [ruleName, ruleValue] of Object.entries(rule)) {
      switch (ruleName) {
        case "required":
          if (!value) {
            result.valid = false;
            result.errors.push("Field required");
          }
          break;
        case "maxChars":
          if (String(value).length > ruleValue) {
            result.valid = false;
            result.errors.push("More characters than expected");
          }
          break;
        case "minChars":
          if (String(value).length < ruleValue) {
            result.valid = false;
            result.errors.push("Less characters than expected");
          }
          break;
        case "regexp":
          if (!ruleValue.test(value)) {
            result.valid = false;
            result.errors.push("RegExp error");
          }
          break;
        default:
          result.valid = false;
          result.errors.push("No such validation rule");
          break;
      }
    }

    return result;
  };

  const runValidator = () => {
    // Reset values
    isValid.value = true;
    inputs.value = {};

    let inputValue = toValue(input);

    for (const [ruleName, inputValueItemValue] of Object.entries(rules)) {
      let errors: string[] = [];
      const inputToValidate = inputValue[ruleName];
      const validationResult = validate(inputToValidate, inputValueItemValue);

      if (!validationResult.valid) isValid.value = false;
      errors.push(...validationResult.errors);

      inputs.value[ruleName] = {
        valid: validationResult.valid,
        errors,
      };
    }
  };

  watchEffect(() => {
    runValidator();
  });

  return { isValid, inputs };
}
