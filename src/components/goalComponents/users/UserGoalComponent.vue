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
          <a href="#" @click.prevent="editGoal">
            <span data-tooltip tabindex="2" title="Kommentar schreiben">
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
  </div>
</template>

<script>
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Goal from '@/classes/Goal';

dayjs.extend(customParseFormat);

export default {
  name: 'GoalComponent',
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
    };
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
      console.log(dayjs('2019-01-25').format('DD/MM/YYYY'));
      return date;
    },
  },
};
</script>

<style lang="scss">
@import '@/style/goals.scss';

.likes {
font-size: 1em;
padding-top:15%;
}

.isDone {
  background-color: get-color(success);
}
</style>
