export default class Goal {
  constructor(
    id,
    description,
    name,
    addedOn,
    week,
    workloadPoints,
  ) {
    Object.assign(this, {
      id,
      description,
      name,
      addedOn,
    });
    this.week = week;
    this.workloadPoints = workloadPoints;
  }
}
