export default class GoalsCollection {
  constructor(name = '', date = {}, goalArray = []) {
    this.name = name;
    this.date = date;
    this.goals = goalArray;
  }

  findById(id) {
    return this.goals.find((g) => g.id === id);
  }

  findAll() {
    return this.goals;
  }

  delete(goal) {
    const { id } = goal;
    const newGoalArray = this.goals.filter((g) => g.id !== id);
    this.goals = newGoalArray;
    return this.goals;
  }

  add(goal) {
    this.goals.push(goal);
  }

  update(goal) {
    const index = this.goals.findIndex((g) => g.id === goal.id);
    this.goals[index] = goal;
    return this.goals;
  }

  setGoals(goalArray = []) {
    this.goals = goalArray;
  }
}
