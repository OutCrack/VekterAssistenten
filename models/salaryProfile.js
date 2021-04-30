class SalaryProfile {
  constructor(
    id,
    title,
    startDate,
    endDate,
    hourly,
    nightExtra,
    weekendExtra,
    holidayExtra,
    monthlyHours,
    foodMoney,
    functionSupplement,
    serviceExtension,
    certificate
  ) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.hourly = hourly;
    this.nightExtra = nightExtra;
    this.weekendExtra = weekendExtra;
    this.holidayExtra = holidayExtra;
    this.monthlyHours = monthlyHours;
    this.foodMoney = foodMoney;
    this.functionSupplement = functionSupplement;
    this.serviceExtension = serviceExtension;
    this.certificate = certificate;
  }
}

export default SalaryProfile;