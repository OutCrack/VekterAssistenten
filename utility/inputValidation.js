import { Alert } from "react-native";

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
  const splitString1 = val.slice(0, 2);
  const splitString2 = val.slice(2, 4);

  isValid = splitString1 < 24 && splitString2 < 60;

  return isValid;
};

export const isValidDate = (val) => {
  return /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/.test(
    val
  );
};

export const validSalaryProfileInput = (
  startDate,
  endDate,
  hourly,
  certificate,
  nightExtra,
  weekendExtra,
  holidayExtra,
  monthlyHours,
  foodMoney,
  functionSupplement,
  serviceExtension
) => {
  // This will match valid dates in the format DD/MM/YYYY. It takes leap years into account when matching feb 29th and covers from 01/01/0000 to 31/12/9999
  if (
    !/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/.test(
      startDate
    ) ||
    !/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/.test(
      endDate
    )
  ) {
    Alert.alert(
      "Ikke gyldig dato",
      "Hint! Riktig format DD/MM/ÅÅÅÅ",
      [{ text: "Ok", style: "cancel" }],
      {
        cancelable: true,
      }
    );
    return false;
  }
  // This wil match valid numbers with dot in format XX.XX
  if (
    !/^[0-9]+([\.][0-9]+)?$/.test(hourly) ||
    !/^[0-9]+([\.][0-9]+)?$/.test(certificate) ||
    !/^[0-9]+([\.][0-9]+)?$/.test(nightExtra) ||
    !/^[0-9]+([\.][0-9]+)?$/.test(weekendExtra) ||
    !/^[0-9]+([\.][0-9]+)?$/.test(holidayExtra) ||
    !/^[0-9]+([\.][0-9]+)?$/.test(monthlyHours) ||
    !/^[0-9]+([\.][0-9]+)?$/.test(foodMoney)
  ) {
    Alert.alert(
      "Ikke gyldig satser",
      "Hint! Bruk punktum ikke komma. Format eksempel: XX.XX",
      [{ text: "Ok", style: "cancel" }],
      {
        cancelable: true,
      }
    );
    return false;
  }

  if (
    (functionSupplement !== "" &&
      !/^[0-9]+([\.][0-9]+)?$/.test(functionSupplement)) ||
    (serviceExtension !== "" && !/^[0-9]+([\.][0-9]+)?$/.test(serviceExtension))
  ) {
    Alert.alert(
      "Ikke gyldig satser",
      "Feil på funksjonstillegg eller tjenestegrenstillegg. Sjekk format XX.XX ",
      [{ text: "Ok", style: "cancel" }],
      {
        cancelable: true,
      }
    );
    return false;
  }
  return true;
};
