export default class WorkloadPoints {
  constructor({
    id,
    level,
    pointsPerHour,
    description,
  }) {
    Object.assign(this, {
      id,
      level,
      pointsPerHour,
      description,
    });
  }
}
