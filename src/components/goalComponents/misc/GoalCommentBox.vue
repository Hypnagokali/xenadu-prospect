<template>
  <div class="goal-comment-box-wrapper">
    <div class="grid-container fluid comment-box">
        <div
          class="grid-x grid-margin-x grid-margin-y"
          v-for="(comment, index) in getCommentArray"
          :key="comment.id"
        >
        <div class="cell medium-8" :class="{ 'medium-offset-1': isEven(index) }">

          <div class="comment comment-wrapper">
              <div class="comment comment-user">{{ comment.fromUser }}</div>
              <div class="comment-date">{{ postedAt(comment.postedAt) }}</div>
              <div class="comment comment-content">{{ comment.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-container fluid comment-input">
      <div v-show="commentFailureMessage.length > 0" class="callout">
        {{ commentFailureMessage }}
      </div>
      <div class="cell medium-8">
        <textarea
          maxlength="1000"
          v-model="comment"
          placeholder="Schreibe einen Kommentar"
        >
        </textarea>
        <p v-if="isLoading">Kommentar wird abgeschickt...</p>
        <button
          :disabled="isLoading"
          class="button"
          @click.prevent="sendComment">Absenden
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

require('dayjs/locale/de');

dayjs.extend(customParseFormat);
dayjs.locale('de');

export default {
  name: 'GoalCommentBox',
  props: {
    commentArray: Array,
    userId: Number,
    goalId: Number,
  },
  data() {
    return {
      currentCommentArray: [],
      isLoading: false,
      comment: '',
      commentFailureMessage: '',
      styleClasses: {
        current: true,
        currentCommentStyle: '', // 'medium-offset-4',
      },
    };
  },
  computed: {
    getCommentArray() {
      if (this.currentCommentArray.length > 0) {
        return this.currentCommentArray;
      }
      return this.commentArray;
    },
  },
  methods: {
    ...mapActions({ saveComment: 'socialMedia/saveComment' }),
    sendComment() {
      const commentData = {
        comment: this.comment,
        userId: this.userId,
        goalId: this.goalId,
      };
      if (this.comment.length > 1000) {
        this.commentFailureMessage = 'Ein Kommentar darf keine 1000 Zeichen übersteigen';
      } else if (this.comment.length > 0) {
        this.commentFailureMessage = '';
        this.isLoading = true;
        this.saveComment(commentData)
          .then((refreshedComments) => {
            this.currentCommentArray = refreshedComments;
          })
          .catch(() => {
            this.commentFailureMessage = 'Irgendwas hat nicht funktioniert';
          })
          .finally(() => {
            this.comment = '';
            this.isLoading = false;
          });
      } else {
        this.commentFailureMessage = 'Leere Kommentare werden nicht versendent';
      }
    },
    switchStyleClass() {
      if (this.styleClasses.currentCommentStyle.length < 1) {
        this.styleClasses.currentCommentStyle = 'medium-offset-4';
      } else {
        this.styleClasses.currentCommentStyle = '';
      }
    },
    isEven(index) {
      if ((index + 1) % 2 === 0) {
        return true;
      }
      return false;
    },
    postedAt(datetime) {
      return dayjs(datetime).format('ddd DD.MM., HH:mm[Uhr]');
    },
  },
};
</script>

<style scoped lang="scss">
.goal-comment-box-wrapper {
  padding:0;
  margin: 0;
}
textarea {
  display: block;
  resize: none;
}
</style>
