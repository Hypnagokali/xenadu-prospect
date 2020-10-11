export default class GoalsCollectionList {
  constructor() {
    this.collections = [];
  }

  addGoalCollection(goalCollection) {
    this.collections.push(goalCollection);
  }

  isEmpty() {
    let empty = true;
    this.collections.forEach((c) => {
      if (c.goals.length > 0) {
        empty = false;
      }
    });
    console.log('isEmpty in GoalsCollList', empty);
    return empty;
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
