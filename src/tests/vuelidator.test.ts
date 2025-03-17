import { expect, it, describe } from "vitest";
// import { mount } from "@vue/test-utils";
import { reactive, nextTick } from "vue";
import { useVuelidator } from "../composables/useVuelidator";

describe("display message", () => {
  const inputsList: {
    username: null | string;
    email: null | string;
    password: null | string;
  } = reactive({
    username: null,
    email: null,
    password: null,
  });

  const rules = {
    username: {
      required: true,
      minChars: 5,
    },
    email: {
      required: true,
    },
    password: {
      required: true,
    },
  };

  const { isValid, inputs } = useVuelidator(inputsList, rules);

  it("form error", () => {
    expect(isValid.value).toBe(false);
    expect(inputs.value).toStrictEqual({
      email: {
        errors: ["Field required"],
        valid: false,
      },
      password: {
        errors: ["Field required"],
        valid: false,
      },
      username: {
        errors: ["Field required", "Less characters than expected"],
        valid: false,
      },
    });
  });

  it("form success", async () => {
    inputsList.username = "Bestnameever";
    inputsList.email = "valid@example.com";
    inputsList.password = "123456";

    await nextTick();

    expect(isValid.value).toBe(true);
  });
});
