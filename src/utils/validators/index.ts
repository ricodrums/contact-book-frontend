const re =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const lowerCaseLetters = /[a-z]/g;

// const upperCaseLetters = /[A-Z]/g;

// const numbers = /[0-9]/g;

export const required = (value: string) => value && value.length > 0;

export const isEmail = (value: string) => re.test(String(value).toLowerCase());

export const maxLength = (value: string, maxLength: number) =>
  value.length <= maxLength;

export const minLength = (value: string, minLength: number) =>
  value.length >= minLength;

export const isEqual = (value: string, checkValue: string) =>
  value === checkValue;

export const isValidPassword = (value: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(value);
