import snakeToCamelConverter from '@/helper/snakeToCamelConverter';
import decodeHtmlSpecialChars from '@/helper/decodeHtmlspecialchars';
import Week from './Week';
import WorkloadPoints from './WorkloadPoints';

export default class Goal {
  constructor(
    id,
    description,
    name,
    addedOn,
    week,
    workloadPoints,
    state = 'todo',
  ) {
    Object.assign(this, {
      id,
      description,
      name,
      addedOn,
      state,
    });
    this.week = week;
    this.workloadPoints = workloadPoints;
  }
}

Goal.DONE = 'done';
Goal.TODO = 'todo';
Goal.POSTPONED = 'postponed';
Goal.SCHEDULED = 'scheduled';

Goal.createGoalFromData = (responseData) => {
  const workloadPointsObject = new WorkloadPoints(
    snakeToCamelConverter(responseData.workloadPoints),
  );
  const weekObject = new Week(
    snakeToCamelConverter(responseData.week),
  );
  const goal = new Goal(
    responseData.id,
    decodeHtmlSpecialChars(responseData.description),
    decodeHtmlSpecialChars(responseData.name),
    responseData.addedOn,
    weekObject,
    workloadPointsObject,
    responseData.state,
  );
  return goal;
};
