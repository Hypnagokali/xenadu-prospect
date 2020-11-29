<template>
  <div v-bind:class="styleState">
    <div class="menu-edit">
      <ul class="xenadu-menu menu align-center">
      <li>
        <a href="#" @click.prevent="toggleDone">
          <span data-tooltip tabindex="1" title="Ziel als erledigt markieren">
            <span class="goal-menu goal-menu goal-menu-done fi-check"></span>
          </span>
          </a>
      </li>
      <li>
        <a href="#" @click.prevent="editGoal">
          <span data-tooltip tabindex="2" title="Ziel bearbeiten">
            <span class="goal-menu goal-menu-edit fi-pencil"></span>
          </span>
        </a>
      </li>
      <li v-if="!overdue">
        <a href="#" @click.prevent="postponeGoal">
          <span data-tooltip tabindex="1" title="Ziel verschieben">
            <span class="goal-menu goal-menu-postpone fi-fast-forward"></span>
          </span>
        </a>
      </li>
      <li v-if="overdue" @click.prevent="scheduleGoal">
        <a href="#">
          <span data-tooltip tabindex="3" title="Ziel neu einplanen">
            <span class="goal-menu goal-menu-postpone fi-arrows-in"></span>
          </span>
        </a>
      </li>
      <li v-if="goal.isRegistered">
        <a href="#">
          <span
            data-tooltip tabindex="4"
            title="Ziel ist mit Monitor verbunden. Ziel vom Monitor entfernen"
          >
            <span class="goal-menu goal-menu-postpone fi-link"></span>
          </span>
        </a>
      </li>
      <li v-else>
        <a href="#">
          <span data-tooltip tabindex="4" title="Ziel zum Monitor hinzufügen">
            <span class="goal-menu goal-menu-postpone fi-unlink"></span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="deleteGoal">
          <span data-tooltip tabindex="1" title="Ziel löschen">
            <span class="goal-menu goal-menu-delete fi-x"></span>
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
    <div class="push-and-comment card-section">
      <span>Wurde
        <strong>{{ goal.pushMotivations }}</strong>
        gepusht
      </span>
      <div>
        <a href="#" @click.prevent="showComment = !showComment">{{ comments.length }} Kommentare</a>
      </div>
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
      :userId="userId"
      :goalId="goal.id"
      :commentArray="comments"
    >
    </GoalCommentBox>
  </div>
</template>

<script>
import Goal from '@/classes/Goal';
import { mapActions, mapGetters } from 'vuex';
import GoalCommentBox from '@/components/goalComponents/misc/GoalCommentBox.vue';

export default {
  name: 'GoalComponent',
  components: {
    GoalCommentBox,
  },
  props: {
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
      comments: [],
      showComment: false,
      stateColors: {
        done: 'isDone',
        todo: '',
      },
    };
  },
  computed: {
    ...mapGetters('auth', { userId: 'getUserId' }),
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
      const date = new Date(this.goal.addedOn);
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      return date.toLocaleDateString('de-DE', options);
    },
  },
  methods: {
    ...mapActions([
      'toggleStateDone',
    ]),
    ...mapActions({ getComments: 'socialMedia/comments' }),
    scheduleGoal() {
      this.$emit('display-schedule-modal', this.goal);
    },
    toggleDone() {
      this.toggleStateDone(this.goal);
    },
    editGoal() {
      this.$emit('display-edit-modal', this.goal);
    },
    deleteGoal() {
      this.$emit('display-delete-modal', this.goal);
    },
    postponeGoal() {
      this.$emit('display-postpone-modal', this.goal);
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
