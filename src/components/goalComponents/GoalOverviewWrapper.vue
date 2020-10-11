<template>
  <div>
    <div>
      <GoalWrapper
        v-if="renderComponent"
        :goals="getCurrent"
        :weekName="weekNames.current"
        @displayDeleteModal="passToParrent"
        @displayEditModal="$emit('displayEditModal', goal)"
      >
      </GoalWrapper>
    </div>
    <div>
      <GoalWrapper
        v-if="renderComponent"
        :goals="getNext"
        :weekName="weekNames.next"
        @displayDeleteModal="$emit('displayDeleteModal', goal)"
        @displayEditModal="$emit('displayEditModal', goal)"
      >
      </GoalWrapper>
    </div>
    <div>
      <h4>Übernächste Woche</h4>
      <div>{{ getNextAfterNext }}</div>
    </div>
    <div>
      <h4>In drei Wochen</h4>
      <div>{{ getInThreeWeeks }}</div>
    </div>
  </div>
</template>

<script>
import GoalNames from '@/enum/WeekNames';
import GoalWrapper from './GoalWrapper.vue';

export default {
  name: 'GoalOverviewWrapper',
  components: {
    GoalWrapper,
  },
  props: {
    goalOverviewObject: Object,
  },
  data() {
    return {
      renderComponent: true,
      weekNames: {
        current: GoalNames.current,
        next: GoalNames.next,
        nextAfterNext: GoalNames.nextAfterNext,
        inThreeWeeks: GoalNames.inThreeWeeks,
      },
    };
  },
  computed: {
    getCurrent() {
      return this.goalOverviewObject.current;
    },
    getNext() {
      return this.goalOverviewObject.next;
    },
    getNextAfterNext() {
      if (this.goalOverviewObject.nextAfterNext.length > 0) {
        return this.goalOverviewObject.nextAfterNext;
      }
      return 'Nichts eingeplant';
    },
    getInThreeWeeks() {
      return this.goalOverviewObject.inThreeWeeks;
    },
  },
  methods: {
    forceRendering() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    passToParrent(goal) {
      this.$emit('displayDeleteModal', goal);
      console.log('GOAL OVERVIEW WRAPPER -> MSG', goal);
    },
  },
};
</script>
