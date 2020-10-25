export default class Comment {
  constructor({
    content, commentingUser, postedAt, goalId,
  }) {
    this.content = content;
    this.fromUser = commentingUser;
    this.postedAt = postedAt;
    this.goalId = goalId;
  }
}
