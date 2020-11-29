<template>
  <div v-bind:class="styleState">
    <div class="menu-edit">
      <ul class="xenadu-menu menu align-center">
        <li>
          <span class="goal-menu likes">{{ goal.pushMotivations }}</span>
          <a href="#" @click.prevent="$emit('push-motivation', goal)">
            <span data-tooltip tabindex="1" title="Push das Ziel">
              <span class="goal-menu fi-like"></span>
            </span>
            </a>
        </li>
        <li>
          <a href="#" @click.prevent="showComment = !showComment">
            <span data-tooltip tabindex="2" title="Kommentare">
              <span class="goal-menu fi-comment"></span>
            </span>
          </a>
        </li>
      </ul>
    </div>
    <div class="card-divider">
      <div>
        <h4>{{ goal.name }} <small>{{ goal.state }}</small></h4>
      </div>
    </div>
    <div class="card-section">
      <h5>{{ goal.description }}</h5>
      <p>hinzugefügt am: <strong>{{ addedOnDateString }}</strong></p>
    </div>
    <div class="workload card-section">
      <span class="left">Belohnungspunkte:
        <strong>{{ goal.workloadPoints.pointsPerHour }}</strong>
        -
      </span>
      <span class="right">Belastungslevel:
        <strong>{{ goal.workloadPoints.level }}</strong>
      </span>
    </div>
    <div>
        <a href="#" @click.prevent="showComment = !showComment">{{ comments.length }} Kommentare</a>
    </div>
    <div
      class="progress"
      role="progressbar"
      tabindex="0"
      aria-valuenow="50"
      aria-valuemin="0"
      aria-valuetext="50 %"
      aria-valuemax="100">
    <div class="progress-meter" v-bind:style="progressBarStyleObject">{{ doneState }}</div>
    </div>
    <GoalCommentBox
      v-if="showComment"
      :commentArray="comments"
      :userId="userId"
      :goalId="goal.id"
    >
    </GoalCommentBox>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Goal from '@/classes/Goal';
import GoalCommentBox from '@/components/goalComponents/misc/GoalCommentBox.vue';

import { mapActions } from 'vuex';

dayjs.extend(customParseFormat);

export default {
  name: 'GoalComponent',
  components: {
    GoalCommentBox,
  },
  props: {
    userId: {
      Number,
      required: true,
    },
    goal: {
      Goal,
      required: true,
    },
    overdue: {
      Boolean,
      default: false,
    },
  },
  data() {
    return {
      stateColors: {
        done: 'isDone',
        todo: '',
      },
      showComment: false,
      comments: [],
    };
  },
  methods: {
    ...mapActions({ getComments: 'socialMedia/comments' }),
  },
  computed: {
    doneState() {
      return this.goal.state === 'done' ? '100%' : '0%';
    },
    progressBarStyleObject() {
      return {
        width: this.doneState,
      };
    },
    styleState() {
      const foundationClasses = ' goal-wrapper card';
      return this.stateColors[this.goal.state] + foundationClasses;
    },
    addedOnDateString() {
      // const theDate = this.goal.addedOn;
      const date = dayjs(this.goal.addedOn).format('DD.MM.YYYY');
      return date;
    },
  },
  created() {
    this.getComments({ userId: this.userId, goalId: this.goal.id })
      .then((comments) => {
        this.comments = comments;
      })
      .catch()
      .finally();
  },
};
</script>

<style lang="scss">
@import '@/style/comments.scss';
@import '@/style/goals.scss';

.likes {
font-size: 1em;
padding-top:15%;
}

.isDone {
  background-color: get-color(success);
}
</style>
