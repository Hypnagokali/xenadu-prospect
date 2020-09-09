export default class GoalsCollectionList {
  constructor() {
    this.collections = [];
  }

  addGoalCollection(goalCollection) {
    this.collections.push(goalCollection);
  }

  findGoalById(id) {
    let goal = null;
    this.collections.forEach((c) => {
      goal = c.goals.find((g) => g.id === id);
    });
    return goal;
    // console.log(this.collections, id);
  }
}
