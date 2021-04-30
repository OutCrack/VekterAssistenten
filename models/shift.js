class Shift {
  constructor(
    id,
    type,
    title,
    shiftId,
    address,
    date,
    startTime,
    endTime,
    overtimePercentage,
    paidLunch,
    note
  ) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.shiftId = shiftId;
    this.address = address;
    this.date = date
    this.startTime = startTime;
    this.endTime = endTime;
    this.overtimePercentage = overtimePercentage;
    this.paidLunch = paidLunch;
    this.note = note;
  }
}

export default Shift;