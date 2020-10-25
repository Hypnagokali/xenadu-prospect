import axios from 'axios';
import Comment from '@/classes/Comment';
import decodeHtmlSpecialChars from '@/helper/decodeHtmlspecialchars';
import emojis from '@/utilities/emojis';

export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    async saveComment({ _ }, commentData) {
      console.log('REFACTOR', _);
      return new Promise((resolve, reject) => {
        axios.post(`users/${commentData.userId}/monitor/goals/${commentData.goalId}/comment/send`, {
          comment: commentData.comment,
        })
          .then((response) => {
            console.log(response.data);
            const comments = [];
            response.data.forEach((comment) => {
              comments.push(new Comment(
                {
                  content: emojis(decodeHtmlSpecialChars(comment.content)),
                  commentingUser: comment.commenting_user.name,
                  goalId: comment.goal_id,
                  postedAt: comment.posted_at,
                },
              ));
              resolve(comments);
            });
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    async comments({ _ }, { userId, goalId }) {
      return new Promise((resolve, reject) => {
        axios.get(`users/${userId}/monitor/goals/${goalId}/comments`)
          .then((response) => {
            console.log('REFACTOR', _);
            const comments = [];
            response.data.forEach((comment) => {
              comments.push(new Comment(
                {
                  content: emojis(decodeHtmlSpecialChars(comment.content)),
                  commentingUser: comment.commenting_user.name,
                  goalId: comment.goal_id,
                  postedAt: comment.posted_at,
                },
              ));
              resolve(comments);
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
