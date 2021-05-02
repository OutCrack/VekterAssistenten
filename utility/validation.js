 export const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rules) {
      case "isEmail":
        isValid = isValid && emailValidator(val);
        break;
      case "minLength":
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case "maxLenth":
        isValid = isValid && maxLengthValidator(val, rules[rule]);
        break;
      case "equalTo":
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      case "notEqualTo":
        isValid = isValid && notEqualToValidator(val, connectedValue[rule]);
        break;
      case "notEmpty":
        isValid = isValid && notEmptyValidator(val);
        break;
      default:
        isValid = true;
    }
  }

  return isValid;
};

const emailValidator = (val) => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val
  );
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

const maxLengthValidator = (val, maxLength) => {
  return val.length <= maxLength;
};

const equalToValidator = (val, checkValue) => {
  return val === checkValue;
};

const notEqualToValidator = (val, checkValue) => {
  return val !== checkValue;
};

const notEmptyValidator = (val) => {
  return val.trim() !== "";
};

export const isValidTime = (val) => {
  let isValid = true;
  const splitString1 = val.slice(0,2);
  const splitString2 = val.slice(2,4);

  isValid = splitString1 < 24 && splitString2 < 60;

  return isValid;
};

