export enum ValidationRule {
  FirstName = 'firstName',
  SecondName = 'secondName',
  Login = 'login',
  Email = 'email',
  Phone = 'phone',
  Password = 'password',
  Required = 'required',
}

const REG_EXP = {
  name: /^[A-Z][A-Za-z-]+$|^[А-ЯЁ][А-Яа-яё-]+$/,
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  password: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
  phone: /^[+]?\d{10,15}$/,
  login: /(?!^\d+$)^[a-zA-Z-_\d]{3,20}$/,
};

const ERROR_MESSAGES = {
  required: 'Поле не может быть пустым',
  name: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр,'
    + 'нет спецсимволов (допустим только дефис)',
  email: 'Введите корректный email',
  phone: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
  login: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,'
    + 'без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
};

const fieldValidations: Record<string, (value: string) => string> = {
  [ValidationRule.Required]: (value: string) => (value.length ? '' : ERROR_MESSAGES.required),
  [ValidationRule.FirstName]: (value: string) => (REG_EXP.name.test(value) ? '' : ERROR_MESSAGES.name),
  [ValidationRule.SecondName]: (value: string) => (REG_EXP.name.test(value) ? '' : ERROR_MESSAGES.name),
  [ValidationRule.Email]: (value: string) => (REG_EXP.email.test(value) ? '' : ERROR_MESSAGES.email),
  [ValidationRule.Login]: (value: string) => (REG_EXP.login.test(value) ? '' : ERROR_MESSAGES.login),
  [ValidationRule.Phone]: (value: string) => (REG_EXP.phone.test(value) ? '' : ERROR_MESSAGES.phone),
  [ValidationRule.Password]: (value: string) => (REG_EXP.password.test(value) ? '' : ERROR_MESSAGES.password),
};

export function validate(rule: ValidationRule, value: string) {
  const trimmedValue = value.trim();
  return fieldValidations[rule](trimmedValue);
}
