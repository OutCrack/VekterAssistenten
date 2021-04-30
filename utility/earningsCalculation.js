const earningsCalculation = (type, amount, rate) => {
  switch (type) {
    case "total":
      var total = 0;
      for (i = 0; i < amount.length; i++) {
        console.log(amount[i]);
        total += amount[i];
      }
      return parseFloat(total).toFixed(2);
    case "hours":
      return amount * rate;
    case "night":
      return amount * rate;
    case "weekend":
      return amount * rate;
    case "redDay":
      return amount * rate;
    default:
      return null;
  }
}

export default earningsCalculation